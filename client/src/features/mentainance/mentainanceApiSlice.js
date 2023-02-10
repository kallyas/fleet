import { apiSlice } from "../../api/apiSlice";

export const mentainanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMentainance: builder.mutation({
      query: (body) => ({
        url: "/maintenance/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Mentainance"],
    }),
    getMentainance: builder.query({
      query: () => ({
        url: "/maintenances/",
      }),
    }),
  }),
});

export const { useAddMentainanceMutation, useGetMentainanceQuery } =
  mentainanceApiSlice;
