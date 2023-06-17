/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import RecentProjectsSection from "components/RecentProjectsSection"
import { Projects } from "helpers/myTypes"

// Add: data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlPagination =
  "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
const projectsUrlPopulate = "&populate=*"

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    projectsUrl + projectsUrlPagination + projectsUrlPopulate
  )
  const projects = await res.json()

  return {
    props: {
      projects
    }
  }
}

// Props
type PortfolioIndexPage = {
  projects: Projects
}

const PortfolioIndexPage = ({ projects }: PortfolioIndexPage) => {
  console.log(projects)

  return (
    <Layout>
      <SEO title="" metaDescription="" />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        {/* Project filtering */}
        <section>
          <Container></Container>
        </section>
        <RecentProjectsSection projects={projects} />
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
