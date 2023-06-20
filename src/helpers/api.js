export const getStrapiUrl = () => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return "http://192.168.0.2:1337"
  } else {
    return process.env.STRAPI_API_URL
  }
}
