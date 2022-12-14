import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getCognitoUser,
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";

interface authLoginNewPasswordPayload {
  newPassword: string;
}

export const authLoginNewPassword =
  ({ newPassword }: authLoginNewPasswordPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const cognitoUser = getCognitoUser(getState());

      cognitoUser?.completeNewPasswordChallenge(
        newPassword,
        {},
        {
          onSuccess: (result) => {
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
          onFailure: (err) => {
            console.log("err", err);
            reject(err);
          },
          mfaRequired: function (codeDeliveryDetails) {
            reject("MFA Required");
            // const verificationCode = prompt("Please input verification code", "");
            // cognitoUser.sendMFACode(verificationCode as string, this);
          },
        }
      );
    });
