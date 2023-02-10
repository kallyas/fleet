import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehichle/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Vehichles", id: "LIST" }],
    }),
    getVehichles: builder.query({
      query: () => ({
        url: "/vehichles/",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return vehicleAdapter.setAll(initialState, response);
      },
      providesTags: (error, result, args) => {
        if (result?.ids) {
          return result[
            {
              type: "Vehichles",
              id: "LIST",
              ...result.ids.map((id) => ({ type: "Vehichles", id })),
            }
          ];
        } else {
          return [{ type: "Vehichles", id: "LIST" }];
        }
      },
    }),
    searchVehichles: builder.query({
      query: (search) => ({
        url: `/search/vehichle/${search}`,
      }),
      invalidatesTags: ["Vehichles"],
    }),
  }),
});

export const {
  useAddVehicleMutation,
  useGetVehichlesQuery,
  useSearchVehichlesQuery,
} = vehicleApiSlice;
