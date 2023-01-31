import { AppDispatch, RootState } from "~/app/store";
import { refreshAccessToken } from "~/features/auth/actions/refreshAccessToken";
import { getAccessToken } from "~/features/auth/authSlice";
import { userManager } from "~/features/auth/utils/userManager";
import { queryApi } from "~/services/queryApi";

export const startupAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("startup async");
    const accessToken = getAccessToken(getState());

    if (accessToken) {
      // force a refresh of access token. Access token will return null if refresh fails
      const newAccessToken = await dispatch(refreshAccessToken(true));
      if (newAccessToken) {
        const me = await dispatch(queryApi.endpoints.getMe.initiate());
        console.log("user loaded", me.data?.username);
        // dispatch(setUser(me.data as DecodedToken));
        await dispatch(queryApi.endpoints.getShows.initiate());
        // console.log("userManager", userManager);
        return me.data;
      }
    }
  };
