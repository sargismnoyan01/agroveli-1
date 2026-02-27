import { api } from "./api";
import Cookies from "js-cookie";

const storeTokens = async (
  _,
  { queryFulfilled }
) => {
  try {
    const { data } = await queryFulfilled;
    Cookies.set('accessToken', data.access, { expires: 7 });
    Cookies.set('refreshToken', data.refresh, { expires: 7 });
  } catch (err) {
    console.log('Error storing tokens:', err);
  }
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/api/v1/user/auth/register/",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/user/auth/login/",
        method: "POST",
        body,
      }),
      onQueryStarted: storeTokens,
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/user/auth/forgot/email/",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation({
      query: ({uid, token, ...body}) => ({
        url: `/api/v1/user/auth/forgot/reset_password/${uid}/${token}/`,
        method: "POST",
        body,
      }),
    }),

    getProfile: builder.query({
      query: () => "/api/v1/user/auth/get/user/",
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/api/v1/user/auth/change/information",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} = authApi
