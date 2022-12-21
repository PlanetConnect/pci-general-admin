import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import {
  getUsername,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from "~/features/auth/authSlice";
import { getCognitoUser, setCognitoUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authLoginNewPasswordPayload {
  code: string;
  newPassword: string;
}

export const authConfirmPassword =
  ({ code, newPassword }: authLoginNewPasswordPayload) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      console.log(
        "🚀 ~ file: authConfirmPassword.ts:19 ~ newPassword",
        newPassword
      );

      const cognitoUser = getCognitoUser(getState());

      // // console.log("🚀 ~ file: authLoginNewPassword.ts:19 ~ code", code);
      // const cognitoUser = getCognitoUser(getState());
      // console.log(
      //   "🚀 ~ file: authForgotPassword.ts:23 ~ newPromise ~ cognitoUser",
      //   cognitoUser
      // );
      cognitoUser?.confirmPassword(code, newPassword, {
        onSuccess() {
          console.log("Password confirmed!");
          resolve("success");
        },
        onFailure(err) {
          console.log("Password not confirmed!");
        },
      });
    });
