import Head from "next/head"

interface SEOProps {
  title: string
  metaDescription: string
}

const SEO = ({ title, metaDescription }: SEOProps) => {
  console.log(title)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default SEO
