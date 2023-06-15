/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"

// Add: data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(projectsUrl)
//   const data = await res.json()

//   return {
//     props: {
//       data
//     }
//   }
// }

// Props

const PortfolioIndexPage = (props) => {
  console.log(props)

  return (
    <Layout>
      <SEO title="" metaDescription="" />
      <section>

      </section>
      <main>
        <section>
          <Container>

          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
