import { apiSlice } from "../../api/apiSlice";

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehichle/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vehichles"],
    }),
    getVehichles: builder.query({
      query: () => ({
        url: "/vehichles/",
      }),
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
