import { Show } from "@pci/pci-services.types.show";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import HealthCheckResult from "~/features/account/data/types/HealthCheckResult";
import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const baseUrl = "https://dev.serverless-api.planetconnect.com";

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Show", "Account", "Contact", "Role"],
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
      query: () => `/shows`,
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
