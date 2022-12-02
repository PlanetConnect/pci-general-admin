import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginPayload {
  username: string;
  password: string;
}

export const authLogin =
  ({ username, password }: authLoginPayload) =>
  (dispatch: AppDispatch) =>
    new Promise((resolve, reject) => {
      const authenticationData = {
        Username: username,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );

      const userData = {
        Username: username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
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

          // is this what we need to send back?
          resolve(cognitoUser);
        },

        onFailure: function (err) {
          reject(err.message);
        },
      });
    });
