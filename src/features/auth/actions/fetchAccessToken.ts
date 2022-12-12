import {
  AuthenticationDetails,
  CognitoRefreshToken,
  CognitoUser,
} from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";

import { AppDispatch, RootState } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import {
  getAccessToken,
  getCognitoUser,
  getRefreshToken,
  getUsername,
  setAccessToken,
  setCognitoUser,
  setRefreshToken,
} from "~/features/auth/loginSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const fetchAccessToken =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const accessToken = getAccessToken(getState());
      console.log(
        "🚀 ~ file: authRefresh.ts:21 ~ newPromise ~ accessToken",
        accessToken
      );
      if (!accessToken) {
        console.log("no access token");
        dispatch(authLogout());

        return;
      }
      const decoded = jwt_decode(accessToken);
      console.log(
        "🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded",
        decoded
      );

      // if session expired try to refresh
      if (decoded.exp < Date.now() / 1000) {
        console.log("session expired");
        const refreshToken = getRefreshToken(getState());

        const username = getUsername(getState());

        const user = getCognitoUser(getState());

        const userData = {
          Username: user?.username,
          Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
        const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

        cognitoUser.refreshSession(token, (err, session) => {
          if (err) {
            console.log(err);
            dispatch(authLogout());
          } else {
            dispatch(setAccessToken(session.getAccessToken().getJwtToken()));
            dispatch(setRefreshToken(session.getRefreshToken().getToken()));
            dispatch(setCognitoUser(cognitoUser));
          }
        });
      }
    });
