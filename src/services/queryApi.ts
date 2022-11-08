import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import Show from "~/features/show/data/types/Show";
import UpdateResult from "~/features/show/data/types/UpdateResult";

const baseUrl = "https://dev.serverless-api.planetconnect.com";

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Show"],
  endpoints: (builder) => ({
    getShowById: builder.query<GetResult<Show>, string>({
      query: (id: string) => `/shows/${id}`,
    }),
    deleteShow: builder.mutation<DeleteResult, string>({
      query: (id: string) => ({ url: `/shows/${id}`, method: "DELETE" }),
      async onQueryStarted(deletedObj, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          queryApi.util.updateQueryData("getShows", undefined, (draft) => {
            draft.data = draft.data.filter((ele) => {
              return `SHOW#${deletedObj}` !== ele.pk;
            });
            return draft;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    createShow: builder.mutation<CreateResult, Show>({
      query: (payload: Show) => ({
        url: `/shows/`,
        method: "POST",
        body: payload,
      }),
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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          queryApi.util.updateQueryData("getShowById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
