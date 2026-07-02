import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./i18n/request.ts",
});

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/tahririye/:path*",
        destination: "/tahrirye/:path*",
        permanent: true,
      },
      {
        source: "/editorial/:path*",
        destination: "/tahrirye/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/[locale]/**/*": ["./i18n/**/*"],
  },
};

export default withNextIntl(nextConfig);