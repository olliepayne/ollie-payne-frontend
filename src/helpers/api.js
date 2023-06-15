export const getStrapiUrl = () => {
  return process.env.STRAPI_URL || "http://192.168.0.2:1337"
}
