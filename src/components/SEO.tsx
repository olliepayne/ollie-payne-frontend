import Head from "next/head"

interface ISEO {
  title: string
  metaDescription: string
}

const SEO = ({ title, metaDescription }: ISEO) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
    </Head>
  )
}

export default SEO
