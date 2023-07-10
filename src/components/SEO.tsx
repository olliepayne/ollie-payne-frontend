import Head from "next/head"

type Props = {
  title: string
  metaDescription: string
  children?: React.ReactNode | React.ReactNode[]
}

const SEO = ({ children, title, metaDescription }: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      {children}
    </Head>
  )
}

export default SEO
