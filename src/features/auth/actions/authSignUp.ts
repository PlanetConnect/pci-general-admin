import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CognitoUserAttribute,
  ISignUpResult,
} from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import { userPool } from "~/features/auth/utils/userPool";

interface authSignUpPayload {
  username: string;
  password: string;
}

export const authSignUp =
  ({ username, password }: authSignUpPayload) =>
  (dispatch: AppDispatch) =>
    new Promise((resolve, reject) => {
      const emailAttribute = new CognitoUserAttribute({
        Name: "email",
        Value: username,
      });

      const attributes = [emailAttribute];
      return userPool.signUp(
        username,
        password,
        attributes,
        [],
        (err, result) => {
          if (err) {
            console.log("signup err", err);
            reject(err);
            return;
          }
          console.log("signup result", result);
          resolve(result);
        }
      );
    });
