import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { Show } from "@pci/pci-services.types.show";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { CognitoRefreshToken, CognitoUser } from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";

import variables from "~/app/data/vars";
import { RootState } from "~/app/store";
import { authLogout } from "~/features/auth/actions/authLogout";
import {
  getAccessToken,
  getCognitoUser,
  getRefreshToken,
  getUsername,
  setAccessToken,
  setRefreshToken,
} from "~/features/auth/authSlice";
import { setCognitoUser } from "~/features/auth/userSlice";
import { userPool } from "~/features/auth/utils/userPool";
import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const getBaseUrl = (target: string) => {
  let env = "";
  if (variables.env === "development" || variables.env === "dev") {
    env = "dev";
  } else if (variables.env === "beta") {
    env = "beta";
  } else if (variables.env === "production" || variables.env === "prod") {
    env = "prod";
  }
  if (!env) throw new Error(`No environment set: ${variables.env}`);
  return `https://${target}.serverless-api.planetconnect.com/${env}`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  mode: "cors",
  prepareHeaders: async (headers, { getState }) => {
    const token = getAccessToken(getState() as RootState);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const accessToken = getAccessToken(api.getState() as RootState);

  if (accessToken) {
    const decoded = jwt_decode(accessToken);
    // console.log("🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded", decoded);

    // if session expired try to refresh
    if (decoded?.exp < Date.now() / 1000) {
      console.log("session expired");
      const refreshToken = getRefreshToken(api.getState() as RootState);

      const username = getUsername(api.getState() as RootState);

      const user = getCognitoUser(api.getState() as RootState);

      const userData = {
        Username: user?.username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
      const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

      console.log("Starting refresh session");

      cognitoUser.refreshSession(token, (err, session) => {
        if (err) {
          console.log(err);
          api.dispatch(authLogout());
        } else {
          api.dispatch(setAccessToken(session.getAccessToken().getJwtToken()));
          api.dispatch(setRefreshToken(session.getRefreshToken().getToken()));
          api.dispatch(setCognitoUser(cognitoUser));
        }
      });
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  return result;
};

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Show"],
  endpoints: (builder) => ({
    getMe: builder.query<GetResult<DecodedToken>, void>({
      query: () =>
        `https://dev.serverless-api.planetconnect.com/authorization/me`,
    }),
    getShowById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `${getBaseUrl("shows")}/shows/${id}`,
      providesTags: ["Show"],
    }),
    deleteShow: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({
        url: `${getBaseUrl("shows")}/shows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Show"],
    }),
    createShow: builder.mutation<CreateResult<Show>, Show>({
      query: (payload: Show) => ({
        url: `${getBaseUrl("shows")}/shows/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Show"],
    }),
    getShows: builder.query<GetResults<Show>, void>({
      query: () => `${getBaseUrl("shows")}/shows`,
      providesTags: ["Show"],
    }),
    updateShow: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >({
      query: (payload: { show: Show; id: string }) => ({
        url: `${getBaseUrl("shows")}/shows/${payload.id}`,
        method: "PUT",
        body: payload.show,
      }),
      invalidatesTags: ["Show"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMeQuery,
  useGetShowsQuery,
  useDeleteShowMutation,
  useUpdateShowMutation,
  useCreateShowMutation,
  useGetShowByIdQuery,
} = queryApi;
