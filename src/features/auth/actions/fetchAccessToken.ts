import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { CognitoRefreshToken, CognitoUser } from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";

import { AppDispatch, RootState } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "~/features/auth/authSlice";
import { CognitoToken } from "~/features/auth/types/CognitoToken";
import { getUser, setCognitoUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const fetchAccessToken =
  () => (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise((resolve, reject) => {
      const accessToken = getAccessToken(getState());

      if (!accessToken) {
        resolve(undefined);
      }
      const decoded: CognitoToken = jwt_decode(accessToken);
      console.log(
        "🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded",
        decoded
      );

      const user: DecodedToken | undefined = getUser(getState());

      // if session expired try to refresh
      if (decoded.exp < Date.now() / 1000 && user?.username) {
        console.log("session expired");
        const refreshToken = getRefreshToken(getState());

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
            resolve(undefined);
          } else {
            dispatch(setAccessToken(session.getAccessToken().getJwtToken()));
            dispatch(setRefreshToken(session.getRefreshToken().getToken()));
            dispatch(setCognitoUser(cognitoUser));
            resolve(token);
          }
        });
      }
    });
