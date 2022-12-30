/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
