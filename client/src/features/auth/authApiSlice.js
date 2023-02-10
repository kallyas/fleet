import { apiSlice } from "../../api/apiSlice";
import { logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register/",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      onQueryStarted: (arg, { dispatch }) => {
        dispatch(logout());
      },
    }),
  }),
});


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authApiSlice;