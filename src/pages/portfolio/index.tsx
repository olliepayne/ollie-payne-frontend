/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Heading, Box, Container, Button, AspectImage } from "theme-ui"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import ProjectCard from "components/ProjectCard"
import HeroSection from "components/HeroSection"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { Projects, SkillTags, Project } from "helpers/myTypes"
import SkillTagsList from "components/SkillTagsList"

// Root URLs
const projectsUrl = `${getStrapiUrl()}/api/projects`
const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

// Data fetching
export const getStaticProps: GetStaticProps = async () => {
  // Projects
  const getProjects = async () => {
    const urlPopulate = "populate=*"
    const url = `${projectsUrl}?${urlPopulate}`

    const res = await fetch(url)
    const projects = await res.json()
    return projects
  }
  const projects = await getProjects()

  // Skill tags
  const getSkillTags = async () => {
    const urlSort = "sort[0]=name:asc"
    const url = `${skillTagsUrl}?${urlSort}`

    const res = await fetch(url)
    const skillTags = await res.json()
    return skillTags
  }
  const skillTags = await getSkillTags()

  return {
    props: {
      projects,
      skillTags
    }
  }
}

// Props
type Props = {
  projects: Projects
  skillTags: SkillTags
}

const PortfolioIndexPage = ({ projects, skillTags }: Props) => {
  const { asPath } = useRouter()

  // For pagination
  const pageSize = 1
  const [currentPage, setCurrentPage] = useState(1)

  // Filtered projects dat (state) and handle filtering
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects.data
  )
  const handleFilterProjects = async () => {
    if (asPath.includes("skill")) {
      const skillTagId = parseInt(asPath.split("skill=")[1])

      const newFilteredProjects = projects.data.filter((project) => {
        let skillMatch = false
        project.attributes.skillTags.data.filter((skillTag) => {
          if (skillTag.id === skillTagId) {
            skillMatch = true
          }
        })

        return skillMatch
      })
      setFilteredProjects(newFilteredProjects)
    } else {
      setFilteredProjects(projects.data)
    }
  }

  useEffect(() => {
    handleFilterProjects()

    // Rest
    setCurrentPage(1)
  }, [asPath])

  //
  const handleLoadMoreResults = () => {
    if (pageSize * currentPage < filteredProjects.length) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
    }
  }

  return (
    <Layout>
      <SEO title="" metaDescription="" />
      <HeroSection h1="Portfolio" />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        {/* Project filtering */}
        <section
          sx={{
            py: 5
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              Explore by Skills
            </Heading>

            {/* Tags */}
            <Box>
              <SkillTagsList skillTags={skillTags.data} />
            </Box>

            {/* Filtered projects results */}
            <ul
              sx={{
                my: 4,
                p: 0,
                listStyle: "none",
                "> li:not(:last-child)": {
                  mb: 4
                }
              }}
            >
              {filteredProjects.map((project, index) => (
                <li
                  key={index}
                  sx={{
                    display: index < pageSize * currentPage ? "block" : "none"
                  }}
                >
                  <ProjectCard
                    project={project}
                    flipped={index > 0 && index % 2 === 1 ? true : false}
                  />
                </li>
              ))}
            </ul>

            {/* Load more button (pagination control) */}
            {pageSize * currentPage < filteredProjects.length && (
              <Button
                variant="secondary"
                onClick={handleLoadMoreResults}
                sx={{
                  cursor: "pointer",
                  display: "block",
                  m: "0 auto"
                }}
              >
                Load More
              </Button>
            )}
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
