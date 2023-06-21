export const getStrapiUrl = () => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return process.env.DEV_STRAPI_API_URL
  } else {
    return process.env.STRAPI_API_URL
  }
}
