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

// # Props
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

  // Handle initial project filtering via url *from query link to page
  const handleInitialFilteredProjects = async () => {}

  const handleFilteredProjects = async () => {
    let projectFiltersUrl = "?filters"
    if (queryFilters.skill1 !== undefined) {
      projectFiltersUrl += `[skillTags][id][$eq]=${queryFilters.skill1}`
    }

    if (queryFilters.skill2 !== undefined) {
      projectFiltersUrl += `&[skillTags][id][$eq]=${queryFilters.skill2}`
    }

    const res = await fetch(
      projectsUrl + projectFiltersUrl + projectsUrlPopulate
    )
    const newFilteredProjects = await res.json()
    console.log(newFilteredProjects)
    setFilteredProjects(newFilteredProjects)
  }

  // Handle the application of skill tags
  // - allow up to 3 tags
  type QueryFilters = {
    skill1: undefined | string
    skill2: undefined | string
    skill3: undefined | string
  }
  const [queryFilters, setQueryFilters] = useState<QueryFilters>({
    skill1: undefined,
    skill2: undefined,
    skill3: undefined
  })
  const handleUpdateQuery = (skillTag: SkillTag) => {
    if (queryFilters.skill1 === undefined) {
      setQueryFilters({ ...queryFilters, skill1: skillTag.id.toString() })
      router.push({
        query: {
          skill1: skillTag.id.toString()
        }
      })
      return
    } else if (queryFilters.skill2 === undefined) {
      setQueryFilters({ ...queryFilters, skill2: skillTag.id.toString() })
      router.push({
        query: {
          skill1: queryFilters.skill1,
          skill2: skillTag.id.toString()
        }
      })
    }

    handleFilteredProjects()
  }

  const getSkillTagBorderColor = () => {}

  useEffect(() => {
    if (asPath.includes("?")) handleFilteredProjects()
  }, [queryFilters])

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
                      sx={{
                        // borderColor: appliedSkillTags?.includes(skillTag)
                        //   ? "myPink"
                        //   : "black",
                        transition: "background-color 0.2s"
                        // ":hover": {
                        //   backgroundColor: appliedSkillTags.includes(skillTag)
                        //     ? "#F5F5F5"
                        //     : "transparent"
                        // }
                      }}
                      onClick={() => handleUpdateQuery(skillTag)}
                    >
                      {skillTag.attributes.name}
                    </Button>
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
