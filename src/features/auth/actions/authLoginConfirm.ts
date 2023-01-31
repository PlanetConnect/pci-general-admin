import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginConfirmPayload {
  code: string;
}

export const authLoginConfirm =
  ({ code }: authLoginConfirmPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const email = getUsername(getState());

      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          reject(err);
        }
        console.log("call result: " + result);
        const accessToken = result.getAccessToken().getJwtToken();
        console.log("🚀 ~ file: authLoginMfa.ts:34 ~ accessToken", accessToken);

        resolve(result);
      });
    });
