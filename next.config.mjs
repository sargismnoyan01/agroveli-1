/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agroveli.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);