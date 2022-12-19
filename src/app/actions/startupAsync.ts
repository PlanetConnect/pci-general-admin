import { CognitoUser } from "amazon-cognito-identity-js";

import { AppDispatch, RootState } from "~/app/store";
import { getAccessToken } from "~/features/auth/authSlice";
import { getLoggedIn, setUser } from "~/features/auth/userSlice";
import { queryApi } from "~/services/queryApi";

export const startupAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("startup async");
    const accessToken = getAccessToken(getState());
    console.log("🚀 ~ file: startupAsync.ts:12 ~ accessToken", accessToken);
    const loggedIn = getLoggedIn(getState());

    if (accessToken && loggedIn) {
      const me = await dispatch(queryApi.endpoints.getMe.initiate());
      console.log("user loaded", me.data?.username);
      dispatch(setUser(me.data));
      return me.data;
    }
  };
