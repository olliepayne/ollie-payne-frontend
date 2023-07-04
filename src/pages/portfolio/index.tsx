/** @jsxImportSource theme-ui */

// Packages
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
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
const urlSort = `sort[0]=datePublished:desc`

const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

const urlPopulate = "populate=*"

// Data fetching
export const getStaticProps: GetStaticProps = async () => {
  // Projects
  const getProjects = async () => {
    const url = `${projectsUrl}?${urlSort}&${urlPopulate}`

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

type Props = {
  projects: Projects
  skillTags: SkillTags
}

const PortfolioIndexPage = ({ projects, skillTags }: Props) => {
  const { asPath } = useRouter()

  // For pagination
  const pageSize = 1
  const [currentPage, setCurrentPage] = useState(1)

  // Get filtered projects and handle state
  const [filteredProjects, setFilteredProjects] = useState<
    Projects | undefined
  >(projects)
  useEffect(() => {
    const getFilteredProjects = async () => {
      if (asPath.includes("skill")) {
        const skillTagId = parseInt(asPath.split("skill=")[1])

        // URLs
        const urlFilters = `filters[skillTags][id][$eq]=${skillTagId}`
        const url = `${projectsUrl}?${urlFilters}&${urlSort}&${urlPopulate}`

        const res = await fetch(url)
        const data = await res.json()
        setFilteredProjects(data)
      } else {
        setFilteredProjects(projects)
      }
    }
    getFilteredProjects()

    // Reset
    setCurrentPage(1)
  }, [asPath])

  //
  const handleLoadMoreResults = () => {
    if (pageSize * currentPage < filteredProjects.data.length) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
    }
  }

  return (
    <Layout>
      <SEO
        title="Portfolio: My Projects for Front-End Development and SEO"
        metaDescription="Check out what I have built, how I built them, and the problems that I encountered as well as how I solved them."
      />
      {/* <HeroSection h1="Portfolio" /> */}
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
              {filteredProjects?.data.map((project, index) => (
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
            {filteredProjects &&
              pageSize * currentPage < filteredProjects.data.length && (
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
