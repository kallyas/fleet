import { apiSlice } from "../../api/apiSlice";

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDriver: builder.mutation({
      query: (body) => ({
        url: "/driver/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Drivers"]
    }),
    getDrivers: builder.query({
      query: () => ({
        url: "/drivers/",
      }),
    }),
  }),
});

export const { useAddDriverMutation, useGetDriversQuery } = driverApiSlice;
