/** @jsxImportSource theme-ui */
import { Heading } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import RecentProjectsSection from "components/RecentProjectsSection"
import { Projects } from "helpers/myTypes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProjectCard from "components/ProjectCard"

// Data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlPagination =
  "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
const projectsUrlPopulate = "&populate=*"

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    projectsUrl + projectsUrlPagination + projectsUrlPopulate
  )
  const recentProjects = await res.json()

  return {
    props: {
      recentProjects
    }
  }
}

// Props
type PortfolioIndexPage = {
  recentProjects: Projects
}

const PortfolioIndexPage = ({ recentProjects }: PortfolioIndexPage) => {
  // Path splitting
  const { asPath, route } = useRouter()
  const getSkillTagsIds = () => {
    const splitPath = asPath.split("=")
    return splitPath[splitPath.length - 1].split("&")
  }
  const skillTagsIds = getSkillTagsIds()

  // Project filtering
  const [filteredProjects, setFilteredProjects] = useState<Projects | null>()

  //
  const handleGetFilteredProjects = async () => {
    // sort through the skillTagIds and ma
    const getProjectsUrlFilters = () => {
      // let returnStr = "?filters"
      return (
        "?filters" +
        skillTagsIds.map((skillTagId) => `[skillTags][id][$eq]=${skillTagId}&`)
      )
    }
    const projectsUrlFilters = getProjectsUrlFilters()
    console.log(projectsUrlFilters)
    // const projectsUrlFilters = `?filters[skillTags][id][$eq]=1`

    // fetch the data
    const res = await fetch(
      projectsUrl + projectsUrlFilters + projectsUrlPopulate
    )
    const filteredProjects = await res.json()
    setFilteredProjects(filteredProjects)
  }

  useEffect(() => {
    if (asPath.includes("?skills")) handleGetFilteredProjects()
  }, [])

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
            <Heading
              as="h2"
              variant="styles.h2"
              sx={{
                textAlign: "center",
                mb: 4
              }}
            >
              Explore Projects
            </Heading>
            {filteredProjects && (
              <ul
                sx={{
                  p: 0,
                  listStyle: "none"
                }}
              >
                {filteredProjects.data.map((project) => (
                  <li key={`filteredProjects:${project.id}`}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
        <RecentProjectsSection projects={recentProjects} />
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
