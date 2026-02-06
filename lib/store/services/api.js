import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { baseQueryWithReauth } from "@/lib/store/services/baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Products", "Product"],
  endpoints: () => ({}),
})
