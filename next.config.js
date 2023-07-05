/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    })
    return config
  },
  images: {
    domains: [
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_STRAPI_IMAGE_DOMAIN
        : process.env.NEXT_PUBLIC_STRAPI_IMAGE_DOMAIN
    ]
  }
}

module.exports = nextConfig
