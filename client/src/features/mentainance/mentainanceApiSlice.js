import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const mentainanceAdapter = createEntityAdapter();

const initialState = mentainanceAdapter.getInitialState({});

export const mentainanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMentainance: builder.mutation({
      query: (body) => ({
        url: "/maintenance/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Mentainance", id: "LIST" }],
    }),
    getMentainance: builder.query({
      query: () => ({
        url: "/maintenances/",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return mentainanceAdapter.setAll(initialState, response);
      },
      providesTags: (error, result, args) => {
        if (result?.ids) {
          return result[
            {
              type: "Mentainance",
              id: "LIST",
              ...result.ids.map((id) => ({ type: "Mentainance", id })),
            }
          ];
        } else {
          return [{ type: "Mentainance", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useAddMentainanceMutation, useGetMentainanceQuery } =
  mentainanceApiSlice;
