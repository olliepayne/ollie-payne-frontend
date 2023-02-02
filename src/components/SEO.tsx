interface SEOProps {
  title: string
  metaDescription: string
}

const SEO = ({ title, metaDescription }: SEOProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
    </>
  )
}

export default SEO
