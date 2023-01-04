import { Account, AccountProps } from "@pci/pci-services.types.account";
import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { Show } from "@pci/pci-services.types.show";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import variables from "~/app/data/vars";
import { RootState } from "~/app/store";
import HealthCheckResult from "~/features/account/data/types/HealthCheckResult";
import AccountCreateResult from "~/features/account/types/AccountCreateResult";
import { refreshAccessToken } from "~/features/auth/actions/refreshAccessToken";
import { getAccessToken } from "~/features/auth/authSlice";
import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const getBaseEnv = () => {
  let env = "dev";

  if (variables.env === "beta") {
    env = "beta";
  } else if (variables.env === "production" || variables.env === "prod") {
    env = "prod";
  }
  return env;
};

const getBaseUrl = (target: string) => {
  const env = getBaseEnv();
  if (!env) throw new Error(`No environment set: ${variables.env}`);
  return `https://${target}.${variables.api_endpoint}/${env}`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  mode: "cors",
  prepareHeaders: async (headers, { getState }) => {
    const token = getAccessToken(getState() as RootState);
    if (token) {
      // console.log(`setting token: ${token}`);
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
  // refresh access token if needed
  await api.dispatch(refreshAccessToken());

  const result = await baseQuery(args, api, extraOptions);

  return result;
};

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Show", "Account", "Contact", "Role", "Booth"],
  endpoints: (builder) => ({
    getMe: builder.query<DecodedToken, void>({
      query: () => `${getBaseUrl("authorization")}/me`,
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

    //Change type to accounts
    getAccountById: builder.query<GetResult<Account>, string>({
      query: (id: string) => `${getBaseUrl("accounts")}/accounts/${id}`,
      providesTags: ["Account"],
    }),
    deleteAccount: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({
        url: `${getBaseUrl("accounts")}/accounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Account"],
    }),
    createAccount: builder.mutation<AccountCreateResult, AccountProps>({
      query: (payload: AccountProps) => ({
        url: `${getBaseUrl("accounts")}/accounts/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Account"],
    }),
    getAccounts: builder.query<GetResults<Account>, void>({
      query: () => `${getBaseUrl("accounts")}/accounts`,
      providesTags: ["Account"],
    }),
    updateAccount: builder.mutation<
      UpdateResult<Account>,
      { account: Account; id: string }
    >({
      query: (payload: { account: Account; id: string }) => ({
        url: `${getBaseUrl("accounts")}/accounts/${payload.id}`,
        method: "PUT",
        body: payload.account,
      }),
      invalidatesTags: ["Account"],
    }),
    getAccountsHealthCheck: builder.query<HealthCheckResult, void>({
      query: () => `${getBaseUrl("accounts")}/accounts/health-check`,
      providesTags: ["Account"],
    }),

    // //change type to contacts
    // getContactByEmail: builder.query<GetResult<Show>, string>({
    //   query: (id: string) => `/contacts/${id}`,
    //   providesTags: ["Contact"],
    // }),
    // deleteContact: builder.mutation<DeleteResult, string>({
    //   query: (id: string) => ({ url: `/contacts/${id}`, method: "DELETE" }),
    //   invalidatesTags: ["Contact"],
    // }),
    // createContact: builder.mutation<CreateResult<Show>, Show>({
    //   query: (payload: Show) => ({
    //     url: `/contacts/`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Contact"],
    // }),
    // getContacts: builder.query<GetResults<Show>, void>({
    //   query: () => `/contacts`,
    //   providesTags: ["Contact"],
    // }),
    // updateContact: builder.mutation<
    //   UpdateResult<Show>,
    //   { show: Show; id: string }
    // >({
    //   query: (payload: { show: Show; id: string }) => ({
    //     url: `/contacts/${payload.id}`,
    //     method: "PUT",
    //     body: payload.show,
    //   }),
    //   invalidatesTags: ["Contact"],
    // }),

    // //change type to roles
    // getRoleById: builder.query<GetResult<Show>, string>({
    //   query: (id: string) => `/PCIApiGateway/${id}`,
    //   providesTags: ["Role"],
    // }),
    // deleteRole: builder.mutation<DeleteResult, string>({
    //   query: (id: string) => ({
    //     url: `/PCIApiGateway/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Role"],
    // }),
    // createRole: builder.mutation<CreateResult<Show>, Show>({
    //   query: (payload: Show) => ({
    //     url: `/PCIApiGateway/`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Role"],
    // }),
    // getRoles: builder.query<GetResults<Show>, void>({
    //   query: () => `/PCIApiGateway`,
    //   providesTags: ["Role"],
    // }),
    // updateRole: builder.mutation<
    //   UpdateResult<Show>,
    //   { show: Show; id: string }
    // >({
    //   query: (payload: { show: Show; id: string }) => ({
    //     url: `/PCIApiGateway/${payload.id}`,
    //     method: "PUT",
    //     body: payload.show,
    //   }),
    //   invalidatesTags: ["Role"],
    // }),

    //Change type to Booths
    getBooths: builder.query<
      GetResult<Show>,
      { email: string; showId: string }
    >({
      query: (payload: { email: string; showId: string }) =>
        `${getBaseUrl("booths")}/shows/${payload.showId}/booths/${
          payload.email
        }`,
      providesTags: ["Booth"],
    }),
    getBoothById: builder.query<
      GetResult<Show>,
      { id: string; showId: string }
    >({
      query: (payload: { id: string; showId: string }) =>
        `${getBaseUrl("booths")}/shows/${payload.showId}/booths/${payload.id}`,
      providesTags: ["Booth"],
    }),
    getBoothByAccount: builder.query<
      GetResult<Show>,
      { accountId: string; showId: string }
    >({
      query: (payload: { accountId: string; showId: string }) =>
        `${getBaseUrl("booths")}/shows/${payload.showId}/accounts/${
          payload.accountId
        }/booths`,
      providesTags: ["Booth"],
    }),
    getBoothsByShow: builder.query<GetResults<Show>, string>({
      query: (id: string) => `${getBaseUrl("booths")}/shows/${id}/booths`,
      providesTags: ["Booth"],
    }),
    createBooth: builder.mutation<
      AccountCreateResult,
      { booth: Show; showId: string }
    >({
      query: (payload: { booth: Show; showId: string }) => ({
        url: `${getBaseUrl("booth")}shows/${payload.showId}/booths/`,
        method: "POST",
        body: payload.booth,
      }),
      invalidatesTags: ["Booth"],
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
  //accounts
  useGetAccountsQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useCreateAccountMutation,
  useGetAccountByIdQuery,
  useGetAccountsHealthCheckQuery,
  //booths
  useGetBoothsQuery,
  useGetBoothByIdQuery,
  useGetBoothByAccountQuery,
  useGetBoothsByShowQuery,
  useCreateBoothMutation,
} = queryApi;
