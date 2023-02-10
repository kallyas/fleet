import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const driverAdapter = createEntityAdapter();

const initialState = driverAdapter.getInitialState({});

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDriver: builder.mutation({
      query: (body) => ({
        url: "/driver/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Drivers", id: "LIST" }],
    }),
    getDrivers: builder.query({
      query: () => ({
        url: "/drivers/",
      }),
      providesTags: ["Drivers"],
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return driverAdapter.setAll(initialState, response);
      },
      providesTags: (error, result, args) => {
        if (result?.ids) {
          return result[
            {
              type: "Drivers",
              id: "LIST",
              ...result.ids.map((id) => ({ type: "Drivers", id })),
            }
          ];
        } else {
          return [{ type: "Drivers", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useAddDriverMutation, useGetDriversQuery } = driverApiSlice;
