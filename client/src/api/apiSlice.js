import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/auth/authSlice";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    const { status } = result.error;
    if (status === 401) {
      const { dispatch } = api;
      dispatch(setCredentials({}));
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({}),
  tagTypes: ["Users", "Drivers", "Vehichles", "Mentainance"],
});
