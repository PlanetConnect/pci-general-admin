import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CognitoUserAttribute,
  ISignUpResult,
} from "amazon-cognito-identity-js";

import { AppDispatch } from "~/app/store";
import { setUsername } from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

interface authSignUpPayload {
  email: string;
  password: string;
  phone: string;
}

export const authSignUp =
  ({ email, password, phone }: authSignUpPayload) =>
  (dispatch: AppDispatch) =>
    new Promise((resolve, reject) => {
      const emailAttribute = new CognitoUserAttribute({
        Name: "email",
        Value: email,
      });
      const phoneAttribute = new CognitoUserAttribute({
        Name: "phone_number",
        Value: phone,
      });

      const attributes = [emailAttribute, phoneAttribute];
      return userPool.signUp(email, password, attributes, [], (err, result) => {
        if (err) {
          console.log("signup err", err);
          reject(err);
          return;
        }
        console.log("signup result", result);
        dispatch(setUsername(email));

        resolve(result);
      });
    });
