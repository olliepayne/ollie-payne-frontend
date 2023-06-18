/** @jsxImportSource theme-ui */
import { Heading } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import RecentProjectsSection from "components/RecentProjectsSection"
import { Projects, SkillTags } from "helpers/myTypes"
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
  // Path splitting
  const { asPath } = useRouter()
  const getSkillTagsIds = () => {
    const splitPath = asPath.split("=")
    return splitPath[splitPath.length - 1].split("&")
  }

  const skillTagsIds = getSkillTagsIds()

  // Project filtering
  const [filteredProjects, setFilteredProjects] = useState<Projects | null>()

  const handleGetFilteredProjects = async () => {
    // Sort through the skillTagIds and map results, concat with "?filters" query
    const getProjectsUrlFilters = () => {
      return (
        "?filters" +
        skillTagsIds.map((skillTagId) => `[skillTags][id][$eq]=${skillTagId}&`)
      )
    }
    const projectsUrlFilters = getProjectsUrlFilters()

    // Fetch the data
    const res = await fetch(
      projectsUrl + projectsUrlFilters + projectsUrlPopulate
    )
    const filteredProjects = await res.json()
    setFilteredProjects(filteredProjects)
  }

  // # Skill Tags
  // const [appliedSkillTags, setAppliedSkillTags] = useState<SkillTags | null>()

  const getSkillTagQuery = (skillTagId: number) => {
    // Remove the tag if it was previously selected, otherwise apply it and append it to the path
    if (asPath.includes(skillTagId.toString())) {
      if (asPath.includes("&")) {
        const splitPath = asPath.split("=")
        const skillTagIds = splitPath[1].split("&")
        const index = skillTagIds.indexOf(skillTagId.toString())
        skillTagIds.splice(index, 1)

        return (
          `?skills=` +
          skillTagIds.map((skillTagId, index) => {
            if (skillTagIds.length > 1 && index < skillTagIds.length - 1) {
              return `${skillTagId}&`
            } else {
              return skillTagId
            }
          })
        )
      } else {
        return "/portfolio"
      }
    } else {
      if (asPath.includes("?skills")) {
        return `${asPath}&${skillTagId}`
      } else {
        return `?skills=${skillTagId}`
      }
    }
  }

  // Check to see if the current path has a filter query in when the component mounts
  useEffect(() => {
    if (asPath.includes("?skills")) handleGetFilteredProjects()
  }, [asPath])

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
                    <Link
                      href={getSkillTagQuery(skillTag.id)}
                      sx={{
                        variant: "links.tag",
                        borderColor: asPath.includes(skillTag.id.toString())
                          ? "myPink"
                          : "black"
                      }}
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
