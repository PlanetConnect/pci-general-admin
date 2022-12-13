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
import HealthCheckResult from "~/features/account/data/types/HealthCheckResult";
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
  console.log("🚀 ~ file: queryApi.ts: custom base query");

  const accessToken = getAccessToken(api.getState() as RootState);
  console.log(
    "🚀 ~ file: authRefresh.ts:21 ~ newPromise ~ accessToken",
    accessToken
  );
  if (accessToken) {
    const decoded = jwt_decode(accessToken);
    console.log("🚀 ~ file: authRefresh.ts:29 ~ newPromise ~ decoded", decoded);

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
  tagTypes: ["Show", "Account", "Contact", "Role"],
  endpoints: (builder) => ({
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

    //Change type to accounts
    getAccountById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `/accounts/${id}`,
      providesTags: ["Show"],
    }),
    deleteAccount: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({ url: `/accounts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Account"],
    }),
    createAccount: builder.mutation<CreateResult<Show>, Show>({
      query: (payload: Show) => ({
        url: `/accounts/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Account"],
    }),
    getAccounts: builder.query<GetResults<Show>, void>({
      query: () => `/accounts`,
      providesTags: ["Account"],
    }),
    updateAccount: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >({
      query: (payload: { show: Show; id: string }) => ({
        url: `/accounts/${payload.id}`,
        method: "PUT",
        body: payload.show,
      }),
      invalidatesTags: ["Account"],
    }),
    getAccountsHealthCheck: builder.query<HealthCheckResult, void>({
      query: () => `/accounts/health-check`,
      providesTags: ["Account"],
    }),

    //change type to contacts
    getContactByEmail: builder.query<GetResult<Show>, string>({
      query: (id: string) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({ url: `/contacts/${id}`, method: "DELETE" }),
      invalidatesTags: ["Contact"],
    }),
    createContact: builder.mutation<CreateResult<Show>, Show>({
      query: (payload: Show) => ({
        url: `/contacts/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Contact"],
    }),
    getContacts: builder.query<GetResults<Show>, void>({
      query: () => `/contacts`,
      providesTags: ["Contact"],
    }),
    updateContact: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >({
      query: (payload: { show: Show; id: string }) => ({
        url: `/contacts/${payload.id}`,
        method: "PUT",
        body: payload.show,
      }),
      invalidatesTags: ["Contact"],
    }),

    //change type to roles
    getRoleById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `/PCIApiGateway/${id}`,
      providesTags: ["Role"],
    }),
    deleteRole: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({
        url: `/PCIApiGateway/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
    createRole: builder.mutation<CreateResult<Show>, Show>({
      query: (payload: Show) => ({
        url: `/PCIApiGateway/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    getRoles: builder.query<GetResults<Show>, void>({
      query: () => `/PCIApiGateway`,
      providesTags: ["Role"],
    }),
    updateRole: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >({
      query: (payload: { show: Show; id: string }) => ({
        url: `/PCIApiGateway/${payload.id}`,
        method: "PUT",
        body: payload.show,
      }),
      invalidatesTags: ["Role"],
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
  useGetAccountsQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useCreateAccountMutation,
  useGetAccountByIdQuery,
  useGetAccountsHealthCheckQuery,
} = queryApi;
