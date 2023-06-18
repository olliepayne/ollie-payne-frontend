/** @jsxImportSource theme-ui */
import { Heading, Button } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import RecentProjectsSection from "components/RecentProjectsSection"
import { Projects, SkillTag, SkillTags } from "helpers/myTypes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProjectCard from "components/ProjectCard"
import HeroSection from "components/HeroSection"
import Link from "next/link"

// # Data fetching

// Project content type urls
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlPagination =
  "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
const projectsUrlPopulate = "&populate=*"

// Skill Tag content type urls
const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

export const getStaticProps: GetStaticProps = async () => {
  // Get recent projects
  const getRecentProjects = async () => {
    const res = await fetch(
      projectsUrl + projectsUrlPagination + projectsUrlPopulate
    )
    const recentProjects = await res.json()
    return recentProjects
  }
  const recentProjects = await getRecentProjects()

  // Get skill tags
  const getSkillTags = async () => {
    const res = await fetch(skillTagsUrl)
    const skillTags = await res.json()
    return skillTags
  }
  const skillTags = await getSkillTags()

  return {
    props: {
      recentProjects,
      skillTags
    }
  }
}

// # Props
type PortfolioIndexPage = {
  recentProjects: Projects
  skillTags: SkillTags
}

const PortfolioIndexPage = ({
  recentProjects,
  skillTags
}: PortfolioIndexPage) => {
  const { asPath } = useRouter()

  const [filteredProjects, setFilteredProjects] = useState<Projects | null>()
  const handleAddSkillTag = (skillTag: SkillTag) => {
    
  }

  // Check to see if the current path has a filter query in when the component mounts
  useEffect(() => {}, [])

  return (
    <Layout>
      <SEO title="" metaDescription="" />
      <HeroSection h1="Portfolio" />
      <main
        sx={{
          minHeight: "100vh",
          py: 5
        }}
      >
        {/* Project filtering */}
        <section>
          <Container>
            <Heading
              as="h2"
              variant="styles.h2"
              sx={{
                // textAlign: "center",
                mb: 4
              }}
            >
              Explore by Tags
            </Heading>

            {/* Tags */}
            {skillTags && (
              <ul
                sx={{
                  listStyle: "none",
                  p: 0,
                  display: "inline-flex",
                  "li:not(:last-child)": {
                    mr: 2
                  }
                }}
              >
                {skillTags.data.map((skillTag, index) => (
                  <li key={`skillTags:${index}`}>
                    <Button
                      variant="tag"
                      sx={{}}
                      onClick={() => handleAddSkillTag(skillTag)}
                    >
                      {skillTag.attributes.name}
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {/* Filtered project results */}
            {/* {filteredProjects && (
              <ul
                sx={{
                  p: 0,
                  listStyle: "none"
                }}
              >
                {filteredProjects.data.map((project, index) => (
                  <li key={`filteredProjects:${project.id}`}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            )} */}
          </Container>
        </section>
        <RecentProjectsSection projects={recentProjects} />
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
