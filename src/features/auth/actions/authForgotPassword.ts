import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getCognitoUser,
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { setCognitoUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginNewPasswordPayload {
  email: string;
}

export const authForgotPassword =
  ({ email }: authLoginNewPasswordPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      console.log("🚀 ~ file: authLoginNewPassword.ts:19 ~ newPassword");

      const userData = {
        Username: email,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);

      dispatch(setCognitoUser(cognitoUser));

      cognitoUser?.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          console.log("CodeDeliveryData from forgotPassword: " + data);
        },
        onFailure: function (err) {
          alert(err.message || JSON.stringify(err));
        },
      });
    });
