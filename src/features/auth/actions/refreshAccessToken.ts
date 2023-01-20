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
import { setCognitoUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";

export const refreshAccessToken =
  (force = false) =>
  (dispatch: AppDispatch, getState: () => RootState) =>
    new Promise<void>((resolve) => {
      const accessToken = getAccessToken(getState());

      if (accessToken) {
        const decoded: CognitoToken = jwt_decode(accessToken);

        // if session expired try to refresh
        if (force || (decoded.exp < Date.now() / 1000 && decoded?.username)) {
          // console.log(`expired token: ${accessToken}`);
          console.log(force ? "forcing refresh of token" : "session expired");
          const refreshToken = getRefreshToken(getState());

          const userData = {
            Username: decoded.username,
            Pool: userPool,
          };
          const cognitoUser = new CognitoUser(userData);
          const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

          console.log("Starting refresh session");

          cognitoUser.refreshSession(token, (err, session) => {
            if (err) {
              console.log(
                `could not refresh token, logging out. ${err.message}`
              );
              dispatch(authLogout());
            } else {
              console.log(`refreshed access token`);
              dispatch(setAccessToken(session.getAccessToken().getJwtToken()));
              dispatch(setRefreshToken(session.getRefreshToken().getToken()));
              dispatch(setCognitoUser(cognitoUser));
            }
            resolve();
          });
        } else {
          // don't need to refresk
          resolve();
        }
      } else {
        // no access token to refresh
        resolve();
      }
    });
