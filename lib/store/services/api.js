import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "@/lib/store/services/baseQuery";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Products", "Product"],
  endpoints: () => ({}),
})
