/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Heading, Box, Container, Button } from "theme-ui"

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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projects.data
  )
  const handleFilterProjects = async () => {
    if (asPath.includes("skill")) {
      const skillTagId = asPath.split("skill=")[1]

      const newFilteredProjects = projects.data.filter((project) => {
        if (
          project.attributes.skillTags.data.filter(
            (skillTag) => skillTag.id === parseInt(skillTagId)
          )
        ) {
          return project
        }
      })
      console.log(newFilteredProjects)
    } else {
      console.log("test")
    }
  }

  useEffect(() => {
    handleFilterProjects()
  }, [asPath])

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
            ></ul>

            {/* Load more button (pagination control) */}
            <Button
              variant="secondary"
              // onClick={loadMoreResults}
              sx={{
                cursor: "pointer",
                display: "block",
                m: "0 auto"
              }}
            >
              Load More
            </Button>
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
