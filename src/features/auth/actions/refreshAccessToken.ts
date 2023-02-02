import axios from "axios";
import jwt_decode from "jwt-decode";

import { CLIENT_ID, SCOPE, TOKEN_ENDPOINT } from "~/app/data/vars";
import { AppDispatch, RootState } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "~/features/auth/authSlice";
import { CognitoToken } from "~/features/auth/types/CognitoToken";

export const refreshAccessToken =
  (force = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const accessToken = getAccessToken(getState());

    if (accessToken) {
      const decoded: CognitoToken = jwt_decode(accessToken);

      // if session expired try to refresh
      if (force || (decoded.exp < Date.now() / 1000 && decoded?.username)) {
        const refreshToken = getRefreshToken(getState());
        if (refreshToken) {
          // console.log(
          //   "🚀 ~ file: refreshAccessToken.ts:29 ~ refreshToken",
          //   refreshToken
          // );
          // console.log(`expired token: ${accessToken}`);
          console.log(force ? "forcing refresh of token" : "session expired");
          try {
            // POST /oauth/token
            // Content-Type: application/x-www-form-urlencoded
            // grant_type=refresh_token&refresh_token=123&client_id=123&client_secret=123&scope=openid+profile&audience=https%3A%2F%2Fapi.example.com
            const params = new URLSearchParams();
            params.append("grant_type", "refresh_token");
            params.append("client_id", CLIENT_ID);
            params.append("refresh_token", refreshToken);
            params.append("scope", SCOPE);
            const results = await axios.post(TOKEN_ENDPOINT, params);
            if (results?.data?.access_token) {
              // Cognito only returns an access token not a new refresh token
              dispatch(setAccessToken(results.data.access_token));
              return results.data.access_token;
            } else {
              throw new Error("no access token");
            }
          } catch (error) {
            console.log("🚀 ~ file: refreshAccessToken.ts:39 ~ error", error);
            dispatch(authLogout());
          }
          return null;
        }
      } else {
        return accessToken;
      }
      return null;
    }
  };
