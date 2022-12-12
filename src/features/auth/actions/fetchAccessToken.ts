import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
} from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";

import { AppDispatch, RootState } from "~/app/store";
import {
  getAccessToken,
  getRefreshToken,
  getUsername,
  setAccessToken,
  setRefreshToken,
} from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const fetchAccessToken =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const accessToken = getAccessToken(getState());
      console.log(
        "🚀 ~ file: authRefresh.ts:21 ~ newPromise ~ refreshToken",
        accessToken
      );
      if (!accessToken) {
        console.log("no access token");

        return;
      }
      const decoded = jwt_decode(accessToken);
      console.log(
        "🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded",
        decoded
      );

      //   const refreshToken = getRefreshToken(getState());
      //   console.log(
      //     "🚀 ~ file: authRefresh.ts:21 ~ newPromise ~ refreshToken",
      //     refreshToken
      //   );
      //   const username = getUsername(getState());
      //   console.log(
      //     "🚀 ~ file: authRefresh.ts:27 ~ newPromise ~ username",
      //     username
      //   );

      //   const userData = {
      //     Username: username,
      //     Pool: userPool,
      //   };
      //   const cognitoUser = new CognitoUser(userData);

      //   const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

      //   cognitoUser.refreshSession(token, (err, session) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(
      //         "🚀 ~ file: authRefresh.ts:34 ~ cognitoUser.refreshSession ~ session",
      //         session
      //       );
      //     }
      //   });
    });
