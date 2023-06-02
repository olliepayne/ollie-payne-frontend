import Head from "next/head"

interface SEOProps {
  title: string
  metaDescription: string
}

const SEO = ({ title, metaDescription }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
    </Head>
  )
}

export default SEO
