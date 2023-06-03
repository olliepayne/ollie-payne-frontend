import Head from "next/head"

interface ISEO {
  title: string
  metaDescription: string
}

const SEO = ({ title, metaDescription }: ISEO) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
    </Head>
  )
}

export default SEO
