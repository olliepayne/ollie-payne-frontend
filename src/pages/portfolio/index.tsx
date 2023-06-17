/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetServerSideProps, GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import RecentProjectsSection from "components/RecentProjectsSection"
import { Projects } from "helpers/myTypes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProjectCard from "components/ProjectCard"

// Add: data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlPagination =
  "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
const projectsUrlPopulate = "&populate=*"

export const getServerSideProps: GetServerSideProps = async () => {
  // - get the recent projects and return the json
  const getRecentProjects = async () => {
    const res = await fetch(
      projectsUrl + projectsUrlPagination + projectsUrlPopulate
    )
    const recentProjects = await res.json()
    return recentProjects
  }
  const recentProjects = await getRecentProjects()

  // -

  return {
    props: {
      recentProjects
    }
  }
}

// Review: likely will scrap this once proper filtering and route querying is performed
// const projectsUrl = `${getStrapiUrl()}/api/projects`
// const projectsUrlPagination =
//   "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
// const projectsUrlPopulate = "&populate=*"

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(
//     projectsUrl + projectsUrlPagination + projectsUrlPopulate
//   )
//   const projects = await res.json()

//   return {
//     props: {
//       projects
//     }
//   }
// }

// Props
type PortfolioIndexPage = {
  // projects: Projects
  recentProjects: Projects
}

const PortfolioIndexPage = ({ recentProjects }: PortfolioIndexPage) => {
  // Path splitting
  const { asPath } = useRouter()
  const splitPath = asPath.split("=")
  const skillTagsIds = splitPath[splitPath.length - 1].split("&")
  // console.log(skillTagsIds)

  // Project filtering
  const [filteredProjects, setFilteredProjects] = useState<Projects | null>()

  // -
  const handleGetFilteredProjects = async () => {
    const projectsUrlFilters = `?filters[skillTags][id][$eq]=1`
    const res = await fetch(
      projectsUrl + projectsUrlFilters + projectsUrlPopulate
    )
    const filteredProjects = await res.json()
    setFilteredProjects(filteredProjects)
  }

  useEffect(() => {
    handleGetFilteredProjects()
  }, [])

  console.log(recentProjects)

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
          <Container>
            {filteredProjects && <ProjectCard project={filteredProjects.data[0]} />}
          </Container>
        </section>
        {/* <RecentProjectsSection projects={recentProjects} /> */}
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
