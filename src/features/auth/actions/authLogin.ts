import { menuItemClasses } from "@mui/material";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import {
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { setCognitoUser, setUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";
import { queryApi } from "~/services/queryApi";

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
        onSuccess: async function (result) {
          const accessToken = result.getAccessToken().getJwtToken();

          dispatch(setAccessToken(accessToken));
          dispatch(setRefreshToken(result.getRefreshToken().getToken()));
          dispatch(setUsername(email));

          // get me from API
          const me = await dispatch(queryApi.endpoints.getMe.initiate());
          dispatch(setUser(me));
          // is this what we need to send back?
          resolve(me);
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

          reject("New Password Required");
          // store userAttributes on global variable
          // sessionUserAttributes = userAttributes;
        },
      });
    });
