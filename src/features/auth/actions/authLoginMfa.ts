import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getCognitoUser,
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginMfaPayload {
  code: string;
}

export const authLoginMfa =
  ({ code }: authLoginMfaPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = getCognitoUser(getState());
      console.log(
        "🚀 ~ file: authLoginMfa.ts:39 ~ newPromise ~ cognitoUser",
        cognitoUser
      );
      if (cognitoUser) {
        cognitoUser.sendMFACode(code, {
          onSuccess: function (result) {
            console.log(
              "🚀 ~ file: Login.tsx ~ line 73 ~ handleSubmit ~ result",
              result
            );
            const accessToken = result.getAccessToken().getJwtToken();
            console.log(
              "🚀 ~ file: Login.tsx ~ line 78 ~ handleSubmit ~ result.getAccessToken()",
              result.getAccessToken()
            );
            console.log(
              "🚀 ~ file: Login.tsx ~ line 78 ~ handleSubmit ~ accessToken",
              accessToken
            );
            // TODO: Save Refresh and Access Token in persist redux
            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(result.getRefreshToken().getToken()));
            // is this what we need to send back?
            resolve(cognitoUser);
          },

          onFailure: function (err) {
            console.log(
              "🚀 ~ file: authLoginMfa.ts:55 ~ newPromise ~ err",
              err
            );

            reject(err.message);
          },
        });
      }
    });
