export const getStrapiUrl = () => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return "http://localhost:1337"
    // return process.env.STRAPI_URL
    // return process.env.STRAPI_URL
  } else if (env === "production") {
    return process.env.PROD_STRAPI_URL
  }
}
