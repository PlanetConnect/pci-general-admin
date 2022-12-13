import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const authResendConfirmationCode =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const email = getUsername(getState());

      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
          reject(err);
        }
        console.log("call result: " + result);
        resolve(result);
      });
    });
