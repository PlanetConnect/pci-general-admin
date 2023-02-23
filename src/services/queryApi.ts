import { Abstract, AbstractProps } from "@pci/pci-services.types.abstract";
import { Account, AccountProps } from "@pci/pci-services.types.account";
import { Attendee, AttendeeProps } from "@pci/pci-services.types.attendee";
import { Booth, BoothProps } from "@pci/pci-services.types.booth";
import { Contact, ContactProps } from "@pci/pci-services.types.contact";
import { DecodedToken } from "@pci/pci-services.types.decoded-token";
import { Show, ShowProps } from "@pci/pci-services.types.show";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { API_ENDPOINT, ENV } from "~/app/data/vars";
import { RootState } from "~/app/store";
import HealthCheckResult from "~/features/account/data/types/HealthCheckResult";
import AccountCreateResult from "~/features/account/types/AccountCreateResult";
import { refreshAccessToken } from "~/features/auth/actions/refreshAccessToken";
import { getAccessToken } from "~/features/auth/authSlice";
import { setUser } from "~/features/auth/userSlice";
import { setCurrentShowId } from "~/features/persist/persistSlice";
import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const getBaseEnv = () => {
  let env = "dev";

  if (ENV === "beta") {
    env = "beta";
  } else if (ENV === "production" || ENV === "prod") {
    env = "prod";
  }
  return env;
};

const getBaseUrl = (target: string) => {
  const env = getBaseEnv();
  if (!env) throw new Error(`No environment set: ${ENV}`);
  return `https://${target}.${API_ENDPOINT}/${env}`;
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
  tagTypes: [
    "Show",
    "Account",
    "Contact",
    "Role",
    "Booth",
    "Attendee",
    "Abstract",
  ],
  endpoints: (builder) => ({
    getMe: builder.query<DecodedToken, void>({
      query: () => `${getBaseUrl("authorization")}/me`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setUser(data));
        } catch (err) {
          // `onError` side-effect
          console.log("getMe ~ err", err);
        }
      },
    }),
    // Shows
    getShowById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `${getBaseUrl("shows")}/shows/${id}`,
      transformResponse: (response: GetResult<ShowProps>) => {
        return { count: response.count, data: new Show(response.data) };
      },
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
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        try {
          // `onSuccess` side-effect
          const { data } = await queryFulfilled;
          const state: RootState = getState() as RootState;
          // If the user has not selected a show, set it to the first show
          if (!state.persist.currentShowId && data.data?.[0]?.show_id) {
            console.log("setting current show");
            dispatch(setCurrentShowId(data.data[0].show_id));
          }
        } catch (err) {
          // `onError` side-effect
          console.log("getShows ~ err", err);
        }
      },
      transformResponse: (response: GetResults<ShowProps>) => {
        const newShows = response.data.map((show) => {
          return new Show(show);
        });
        return { count: response.count, data: newShows };
      },
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
      transformResponse: (response: UpdateResult<ShowProps>) => {
        return {
          success: response.success,
          updated_data: new Show(response.updated_data),
        };
      },
      invalidatesTags: ["Show"],
    }),

    //Accounts
    getAccountById: builder.query<GetResult<Account>, string>({
      query: (id: string) => `${getBaseUrl("accounts")}/accounts/${id}`,
      transformResponse: (response: GetResult<AccountProps>) => {
        return { count: response.count, data: new Account(response.data) };
      },
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
      transformResponse: (response: GetResults<AccountProps>) => {
        const newAccounts = response.data.map((account) => {
          return new Account(account);
        });
        return { count: response.count, data: newAccounts };
      },
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
      transformResponse: (response: UpdateResult<AccountProps>) => {
        return {
          success: response.success,
          updated_data: new Account(response.updated_data),
        };
      },
      invalidatesTags: ["Account"],
    }),

    getAccountsHealthCheck: builder.query<HealthCheckResult, void>({
      query: () => `${getBaseUrl("accounts")}/accounts/health-check`,
      providesTags: ["Account"],
    }),

    // //change type to contacts
    getContactByEmail: builder.query<GetResult<Contact>, string>({
      query: (email: string) => `${getBaseUrl("contacts")}/${email}`,
      transformResponse: (response: GetResult<ContactProps>) => {
        return { count: response.count, data: new Contact(response.data) };
      },
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<DeleteResult, string>({
      query: (email: string) => ({
        url: `${getBaseUrl("contacts")}/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    createContact: builder.mutation<CreateResult<Contact>, Contact>({
      query: (payload: Contact) => ({
        url: `${getBaseUrl("contacts")}/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Contact"],
    }),
    getContacts: builder.query<GetResults<Contact>, void>({
      query: () => `${getBaseUrl("contacts")}`,
      transformResponse: (response: GetResults<ContactProps>) => {
        const newContacts = response.data.map((contact) => {
          return new Contact(contact);
        });
        return { count: response.count, data: newContacts };
      },
      providesTags: ["Contact"],
    }),
    updateContact: builder.mutation<
      UpdateResult<Contact>,
      { contact: Contact; email: string }
    >({
      query: (payload: { contact: Contact; email: string }) => ({
        url: `${getBaseUrl("contacts")}/${payload.email}`,
        method: "PUT",
        body: payload.contact,
      }),
      transformResponse: (response: UpdateResult<ContactProps>) => {
        return {
          success: response.success,
          updated_data: new Contact(response.updated_data),
        };
      },
      invalidatesTags: ["Contact"],
    }),

    //Booths
    // getBooths: builder.query<
    //   GetResult<Booth>,
    //   { email: string; showId: string }
    // >({
    //   query: (payload: { email: string; showId: string }) =>
    //     `${getBaseUrl("booths")}/shows/${payload.showId}/booths/${
    //       payload.email
    //     }`,
    //   providesTags: ["Booth"],
    // }),
    getBoothById: builder.query<
      GetResult<Booth>,
      { id: string; showId: string }
    >({
      query: (payload: { id: string; showId: string }) =>
        `${getBaseUrl("booths")}/shows/${payload.showId}/booths/${payload.id}`,
      transformResponse: (response: GetResult<BoothProps>) => {
        return { count: response.count, data: new Booth(response.data) };
      },
      providesTags: ["Booth"],
    }),
    getBoothByAccount: builder.query<
      GetResult<Booth>,
      { accountId: string; showId: string }
    >({
      query: (payload: { accountId: string; showId: string }) =>
        `${getBaseUrl("booths")}/shows/${payload.showId}/accounts/${
          payload.accountId
        }/booths`,
      transformResponse: (response: GetResult<BoothProps>) => {
        return { count: response.count, data: new Booth(response.data) };
      },
      providesTags: ["Booth"],
    }),
    getBoothsByShow: builder.query<GetResults<Booth>, string>({
      query: (id: string) => `${getBaseUrl("booths")}/shows/${id}/booths`,
      transformResponse: (response: GetResults<BoothProps>) => {
        const newBooths = response.data.map((booth) => {
          return new Booth(booth);
        });
        return { count: response.count, data: newBooths };
      },
      providesTags: ["Booth"],
    }),
    createBooth: builder.mutation<
      AccountCreateResult,
      { booth: Booth; showId: string }
    >({
      query: (payload: { booth: Booth; showId: string }) => ({
        url: `${getBaseUrl("booths")}/shows/${payload.showId}/booths`,
        method: "POST",
        body: payload.booth,
      }),
      invalidatesTags: ["Booth"],
    }),
    updateBooth: builder.mutation<
      UpdateResult<Booth>,
      { booth: Booth; boothId: string; showId: string }
    >({
      query: (payload: { booth: Booth; boothId: string; showId: string }) => ({
        url: `${getBaseUrl("booths")}/shows/${payload.showId}/booths/${
          payload.boothId
        }`,
        method: "PUT",
        body: payload.booth,
      }),
      transformResponse: (response: UpdateResult<BoothProps>) => {
        return {
          success: response.success,
          updated_data: new Booth(response.updated_data),
        };
      },
      invalidatesTags: ["Booth"],
    }),

    // Attendees
    getAttendeeByEmail: builder.query<
      GetResult<Attendee>,
      { email: string; showId: string }
    >({
      query: (payload: { email: string; showId: string }) =>
        `${getBaseUrl("attendees")}/shows/${payload.showId}/attendees/${
          payload.email
        }`,
      transformResponse: (response: GetResult<AttendeeProps>) => {
        return { count: response.count, data: new Attendee(response.data) };
      },
      providesTags: ["Attendee"],
    }),
    getAttendeeByShow: builder.query<GetResults<Attendee>, string>({
      query: (showId: string) =>
        `${getBaseUrl("attendees")}/shows/${showId}/attendees`,
      transformResponse: (response: GetResults<AttendeeProps>) => {
        const newAttendees = response.data.map((attendee) => {
          return new Attendee(attendee);
        });
        return { count: response.count, data: newAttendees };
      },
      providesTags: ["Attendee"],
    }),
    createAttendee: builder.mutation<
      CreateResult<Attendee>,
      { attendee: Attendee; showId: string }
    >({
      query: (payload: { attendee: Attendee; showId: string }) => ({
        url: `${getBaseUrl("attendees")}/shows/${payload.showId}/attendees`,
        method: "POST",
        body: payload.attendee,
      }),
      invalidatesTags: ["Attendee"],
    }),

    updateAttendee: builder.mutation<
      UpdateResult<Attendee>,
      { attendee: Attendee; email: string; showId: string }
    >({
      query: (payload: {
        attendee: Attendee;
        email: string;
        showId: string;
      }) => ({
        url: `${getBaseUrl("attendees")}/shows/${payload.showId}/attendees/${
          payload.email
        }`,
        method: "PUT",
        body: payload.attendee,
      }),
      transformResponse: (response: UpdateResult<AttendeeProps>) => {
        return {
          success: response.success,
          updated_data: new Attendee(response.updated_data),
        };
      },
      invalidatesTags: ["Attendee"],
    }),
    deleteAttendee: builder.mutation<
      DeleteResult,
      { email: string; showId: string }
    >({
      query: (payload: { email: string; showId: string }) => ({
        url: `${getBaseUrl("attendees")}/shows/${payload.showId}/attendees/${
          payload.email
        }`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendee"],
    }),

    // Abstract
    getAbstractByShowId: builder.query<GetResults<Abstract>, string>({
      query: (showId: string) =>
        `${getBaseUrl("abstracts")}/shows/${showId}/abstracts/`,
      transformResponse: (response: GetResults<AbstractProps>) => {
        const newAbstracts = response.data.map((abstract) => {
          return new Abstract(abstract);
        });
        return { count: response.count, data: newAbstracts };
      },
      providesTags: ["Abstract"],
    }),
    getAbstractByShowAndId: builder.query<
      GetResult<Abstract>,
      { showId: string; abstractId: string }
    >({
      query: (payload: { showId: string; abstractId: string }) =>
        `${getBaseUrl("abstracts")}/shows/${payload.showId}/abstracts/${
          payload.abstractId
        }`,
      transformResponse: (response: GetResult<AbstractProps>) => {
        return { count: response.count, data: new Abstract(response.data) };
      },
      providesTags: ["Abstract"],
    }),
    createAbstract: builder.mutation<
      CreateResult<Abstract>,
      { abstract: Abstract; showId: string }
    >({
      query: (payload: { abstract: Abstract; showId: string }) => ({
        url: `${getBaseUrl("abstracts")}/shows/${payload.showId}/abstracts`,
        method: "POST",
        body: payload.abstract,
      }),
      invalidatesTags: ["Abstract"],
    }),

    updateAbstract: builder.mutation<
      UpdateResult<Abstract>,
      { abstract: Abstract; abstractId: string; showId: string }
    >({
      query: (payload: {
        abstract: Abstract;
        abstractId: string;
        showId: string;
      }) => ({
        url: `${getBaseUrl("abstracts")}/shows/${payload.showId}/abstracts/${
          payload.abstractId
        }`,
        method: "PUT",
        body: payload.abstract,
      }),
      transformResponse: (response: UpdateResult<AbstractProps>) => {
        return {
          success: response.success,
          updated_data: new Abstract(response.updated_data),
        };
      },
      invalidatesTags: ["Abstract"],
    }),
    deleteAbstract: builder.mutation<
      DeleteResult,
      { abstractId: string; showId: string }
    >({
      query: (payload: { abstractId: string; showId: string }) => ({
        url: `${getBaseUrl("abstracts")}/shows/${payload.showId}/abstracts/${
          payload.abstractId
        }`,
        method: "DELETE",
      }),
      invalidatesTags: ["Abstract"],
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
  // useGetBoothsQuery,
  useGetBoothByIdQuery,
  useGetBoothByAccountQuery,
  useGetBoothsByShowQuery,
  useCreateBoothMutation,
  useUpdateBoothMutation,
  //contacts
  useGetContactByEmailQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useCreateContactMutation,
  useGetContactsQuery,
  //attendees
  useGetAttendeeByEmailQuery,
  useCreateAttendeeMutation,
  useUpdateAttendeeMutation,
  useGetAttendeeByShowQuery,
  useDeleteAttendeeMutation,
  //abstracts
  useGetAbstractByShowIdQuery,
  useGetAbstractByShowAndIdQuery,
  useCreateAbstractMutation,
  useUpdateAbstractMutation,
  useDeleteAbstractMutation,
} = queryApi;
