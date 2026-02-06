import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/api/v1/main/products/",
        params,
      }),
      providesTags: ["Products"],
    }),

    getPremiumProducts: builder.query({
      query: (params) => ({
        url: "/api/v1/main/products/premium/",
        params,
      }),
      providesTags: ["Products"],
    }),
    getPremiumPlusProducts: builder.query({
      query: (params) => ({
        url: "/api/v1/main/products/premium-plus/",
        params,
      }),
      providesTags: ["Products"],
    }),
    getVipProducts: builder.query({
      query: (params) => ({
        url: "/api/v1/main/products/vip/",
        params,
      }),
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/api/v1/main/products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    getAds: builder.query({
      query: (params) => ({
        url: "/api/v1/main/advertisements/",
        params,
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query({
      query: ({id}) => ({
        url: `/api/v1/main/products/${id}/`,
      }),
      providesTags: ["Product"],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetPremiumProductsQuery,
  useGetPremiumPlusProductsQuery,
  useGetVipProductsQuery,
  useGetAdsQuery,
  useGetProductQuery,
} = productApi
