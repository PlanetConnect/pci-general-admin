import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import {
  setAccessToken,
  setCognitoUser,
  setRefreshToken,
  setSessionUserAttributes,
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
          reject("MFA Required");
          // const verificationCode = prompt("Please input verification code", "");
          // cognitoUser.sendMFACode(verificationCode as string, this);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.
          dispatch(setUsername(email));

          // the api doesn't accept this field back
          delete userAttributes.email_verified;
          delete userAttributes.phone_number_verified;
          delete userAttributes.phone_number;

          console.log(
            "🚀 ~ file: authLogin.ts:97 ~ newPromise ~ requiredAttributes",
            requiredAttributes
          );

          console.log(
            "🚀 ~ file: authLogin.ts:91 ~ newPromise ~ userAttributes",
            userAttributes
          );

          dispatch(setSessionUserAttributes(userAttributes));
          reject("New Password Required");
          // store userAttributes on global variable
          // sessionUserAttributes = userAttributes;
        },
      });
    });
