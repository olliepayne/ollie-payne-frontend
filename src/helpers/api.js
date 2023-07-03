export const getStrapiUrl = () => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return process.env.NEXT_PUBLIC_STRAPI_URL
  } else if (env === "production") {
    return process.env.NEXT_PUBLIC_STRAPI_URL
  }
}
