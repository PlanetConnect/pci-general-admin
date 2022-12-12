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
import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const baseUrl = "https://dev.serverless-api.planetconnect.com";

const baseQuery = fetchBaseQuery({
  baseUrl,
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
  console.log("🚀 ~ file: queryApi.ts: custom base query");
  // const {
  //   getState,
  //   dispatch,
  // }: { getState: () => RootState; dispatch: AppDispatch } = api;
  const accessToken = getAccessToken(api.getState() as RootState);
  console.log(
    "🚀 ~ file: authRefresh.ts:21 ~ newPromise ~ accessToken",
    accessToken
  );
  if (accessToken) {
    const decoded = jwt_decode(accessToken);
    console.log("🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded", decoded);

    // if session expired try to refresh
    if (decoded.exp < Date.now() / 1000) {
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
          console.log(
            "🚀 ~ file: queryApi.ts:70 ~ cognitoUser.refreshSession ~ session",
            session
          );

          api.dispatch(setAccessToken(session.getAccessToken().getJwtToken()));
          api.dispatch(setRefreshToken(session.getRefreshToken().getToken()));
          api.dispatch(setCognitoUser(cognitoUser));
        }
      });
    }
  }

  const result = await baseQuery(args, api, extraOptions);
  console.log("🚀 ~ file: queryApi.ts:33 ~ >= ~ result", result);

  return result;
};

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Show"],
  endpoints: (builder) => ({
    getShowById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `/shows/${id}`,
      providesTags: ["Show"],
    }),
    deleteShow: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({ url: `/shows/${id}`, method: "DELETE" }),
      invalidatesTags: ["Show"],
    }),
    createShow: builder.mutation<CreateResult<Show>, Show>({
      query: (payload: Show) => ({
        url: `/shows/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Show"],
    }),
    getShows: builder.query<GetResults<Show>, void>({
      query: () => `https://shows.serverless-api.planetconnect.com/dev/shows`,
      providesTags: ["Show"],
    }),
    updateShow: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >({
      query: (payload: { show: Show; id: string }) => ({
        url: `/shows/${payload.id}`,
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
  useGetShowsQuery,
  useDeleteShowMutation,
  useUpdateShowMutation,
  useCreateShowMutation,
  useGetShowByIdQuery,
} = queryApi;
