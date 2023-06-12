export const getStrapiUrl = () => {
  return process.env.STRAPI_API_URL || "http://192.168.0.2:1337"
}
