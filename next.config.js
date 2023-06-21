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
    domains: ["192.168.0.3"]
  }
}

module.exports = nextConfig
