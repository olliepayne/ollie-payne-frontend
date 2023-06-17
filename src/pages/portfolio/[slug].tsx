/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { getStrapiUrl } from "helpers/api"
import { GetStaticPaths, GetStaticProps } from "next"
import { Projects, Project } from "helpers/myTypes"

// Data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(projectsUrl)
  const projects = await res.json()

  const paths = projects.data.map((project: any) => {
    return {
      params: {
        slug: project.attributes.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectsFilters = `?filters[slug][$eq]=${params?.slug}`
  const res = await fetch(projectsUrl + projectsFilters)
  const projects = await res.json()

  return {
    props: {
      projects
    }
  }
}

// Props
type PortfolioSlugPage = {
  projects: Projects
}

const PortfolioSlugPage = ({ projects }: PortfolioSlugPage) => {
  console.log(projects)

  return (
    <Layout>
      <SEO title="" metaDescription="" />
    </Layout>
  )
}

export default PortfolioSlugPage
