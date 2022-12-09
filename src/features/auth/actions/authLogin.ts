import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import {
  setAccessToken,
  setCognitoUser,
  setRefreshToken,
  setUsername,
} from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginPayload {
  email: string;
  password: string;
}

export const authLogin =
  ({ email, password }: authLoginPayload) =>
  (dispatch: AppDispatch) =>
    new Promise((resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );

      const userData = {
        Username: email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
      console.log(
        "🚀 ~ file: authLogin.ts:34 ~ newPromise ~ cognitoUser",
        cognitoUser
      );
      dispatch(setCognitoUser(cognitoUser));
      cognitoUser.authenticateUser(authenticationDetails, {
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
          reject(err.message);
        },
        mfaRequired: function (codeDeliveryDetails) {
          dispatch(setUsername(email));
          cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
              reject(err);
            }
            console.log("call result: " + result);
            resolve(result);
          });
          reject("MFA Required");
          // const verificationCode = prompt("Please input verification code", "");
          // cognitoUser.sendMFACode(verificationCode as string, this);
        },
      });
    });
