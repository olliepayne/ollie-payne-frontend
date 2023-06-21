export const getStrapiUrl = () => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return process.env.DEV_STRAPI_API_URL
  } else {
    return process.env.PROD_STRAPI_API_URL
  }
}

export const getDevImagesDomain = () => {
  return proc
}
