import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import CreateResult from "~/features/show/data/types/CreateResult";
import DeleteResult from "~/features/show/data/types/DeleteResult";
import GetResult from "~/features/show/data/types/GetResult";
import GetResults from "~/features/show/data/types/GetResults";
import Show from "~/features/show/data/types/Show";
import UpdateResult from "~/features/show/data/types/UpdateResult";
import createShow from "~/features/show/endpoints/createShow";
import deleteShow from "~/features/show/endpoints/deleteShow";
import getShowById from "~/features/show/endpoints/getShowById";
import getShows from "~/features/show/endpoints/getShows";
import updateShow from "~/features/show/endpoints/updateShow";

const baseUrl = "https://dev.serverless-api.planetconnect.com";

// Define a service using a base URL and expected endpoints
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getShows: builder.query<GetResults<Show>, void>(getShows),
    getShowById: builder.query<GetResult<Show>, string>(getShowById),
    deleteShow: builder.mutation<DeleteResult, string>(deleteShow),
    updateShow: builder.mutation<
      UpdateResult<Show>,
      { show: Show; id: string }
    >(updateShow),
    createShow: builder.mutation<CreateResult, Show>(createShow),
    // getShows: builder.query<GetResults<Show>, void>({
    //   query: () => `/shows`,
    // }),
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
