import { DecodedToken } from "@pci/pci-services.types.decoded-token";

import { AppDispatch, RootState } from "~/app/store";
import { refreshAccessToken } from "~/features/auth/actions/refreshAccessToken";
import { getAccessToken } from "~/features/auth/authSlice";
import { setUser } from "~/features/auth/userSlice";
import { queryApi } from "~/services/queryApi";

export const startupAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log("startup async");
    const accessToken = getAccessToken(getState());

    if (accessToken) {
      // force a refresh of access token;
      await dispatch(refreshAccessToken(true));
      const me = await dispatch(queryApi.endpoints.getMe.initiate());
      console.log("user loaded", me.data?.username);
      dispatch(setUser(me.data as DecodedToken));
      return me.data;
    }
  };
