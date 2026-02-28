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
      query: ({ body }) => ({
        url: "/api/v1/main/products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({id, body}) => ({
        url: `/api/v1/main/products/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Products", "Product"],
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

    getFavorites: builder.query({
      query: (params) => ({
        url: "/api/v1/main/user_like/",
        params,
      }),
      providesTags: ["Products", "Product"],
    }),

    getUserProducts: builder.query({
      query: (params) => ({
        url: "/api/v1/main/user_product/",
        params,
      }),
      providesTags: ["Products"],
    }),

    likeProduct: builder.mutation({
      query: ({id, ...body}) => ({
        url: `/api/v1/main/like/${id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

  }),
})

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetPremiumProductsQuery,
  useGetPremiumPlusProductsQuery,
  useGetVipProductsQuery,
  useGetAdsQuery,
  useGetProductQuery,
  useGetFavoritesQuery,
  useGetUserProductsQuery,
  useLikeProductMutation,
} = productApi
