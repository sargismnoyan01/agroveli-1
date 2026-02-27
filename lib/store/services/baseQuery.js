import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { formatLabel } from "@/lib/utils";

const API_URL = "https://agroveli.ge/";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, api) => {
    const args = api.arg;

    if (args?.extra?.skipAuth) {
      return headers;
    }

    const locale = Cookies.get('NEXT_LOCALE');
    if (locale) {
      headers.set('Accept-Language', locale || "ru");
    }

    const token = Cookies.get('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const toastErrorRecursive = (data, parentKey) => {
    if (typeof data === 'string') {
      const label = parentKey ? `${formatLabel(parentKey)}: ` : '';
      toast.error(`${label}${data}`);
      return;
    }

    if (Array.isArray(data)) {
      data.forEach((item) => toastErrorRecursive(item, parentKey));
    } else if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
        toastErrorRecursive(data[key], currentKey);
      });
    }
  };

  if (result.error && result.error.status === 400) {
    const data = result.error.data;

    if (data) {
      toastErrorRecursive(data);
    } else {
      toast.error('Unknown validation error');
    }
  }

  if (result?.error?.status === 401) {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return result;

    const refreshResult = await baseQuery(
      {
        url: '/api/v1/auth/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
        extra: { skipAuth: true },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { access, refresh } = refreshResult.data;

      Cookies.set('accessToken', access, { expires: 7 });
      Cookies.set('refreshToken', refresh, { expires: 7 });

      // 🔁 retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // ❌ refresh failed → logout
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      window.location.href = '/auth/login'
    }
  }

  return result;
};
