/** @jsxImportSource theme-ui */
import { Heading, Button, AspectImage } from "theme-ui"
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

// Props
type PortfolioIndexPage = {
  recentProjects: Projects
  skillTags: SkillTags
}

const PortfolioIndexPage = ({
  recentProjects,
  skillTags
}: PortfolioIndexPage) => {
  const router = useRouter()
  const { asPath } = useRouter()

  const [filteredProjects, setFilteredProjects] = useState<Projects | null>()
  const handleFilteredProjects = async () => {
    const skillTagId = asPath.split("=")[1]

    const projectFiltersUrl = `?filters[skillTags][id][$eq]=${skillTagId}`
    const res = await fetch(
      projectsUrl + projectFiltersUrl + projectsUrlPopulate
    )
    const newFilteredProjects = await res.json()
    setFilteredProjects(newFilteredProjects)
  }

  const handleUpdateQuery = (skillTagId: number) => {
    router.replace({
      query: {
        skill: skillTagId
      }
    })
  }

  useEffect(() => {
    handleFilteredProjects()
  }, [asPath])

  const skillTagIsActive = (skillTagId: number) => {
    const queryTargetSkillTagId = `?skill=${skillTagId}`
    if (asPath.includes(queryTargetSkillTagId)) {
      return true
    } else {
      return false
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
            <Heading
              as="h2"
              variant="styles.h2"
              sx={{
                mb: 4
              }}
            >
              Explore by Skills
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
                    <Link
                      href={`?skill=${skillTag.id}`}
                      sx={{
                        variant: "links.tag",
                        borderColor: skillTagIsActive(skillTag.id)
                          ? "myPink"
                          : "black",
                        backgroundColor: skillTagIsActive(skillTag.id)
                          ? "myPink"
                          : "transparent"
                      }}
                      // onClick={() => handleUpdateQuery(skillTag.id)}
                    >
                      {skillTag.attributes.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Filtered project results */}
            {filteredProjects && (
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
            )}
          </Container>
        </section>
        <RecentProjectsSection projects={recentProjects} />
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
