/** @jsxImportSource theme-ui */
import { Heading, Box } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Container } from "theme-ui"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import { Projects, SkillTags } from "helpers/myTypes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProjectCard from "components/ProjectCard"
import HeroSection from "components/HeroSection"
import Link from "next/link"

// Project content type urls
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlSort = "sort[0]=datePublished:desc"
const projectsUrlPagination = "pagination[page]=1&pagination[pageSize]=5"
const projectsUrlPopulate = "populate=*"

// Skill Tag content type urls
const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

export const getStaticProps: GetStaticProps = async () => {
  // Get recent projects
  const getRecentProjects = async () => {
    const url = `${projectsUrl}?${projectsUrlSort}&${projectsUrlPagination}&${projectsUrlPopulate}`
    const res = await fetch(url)
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
  const { asPath } = useRouter()

  const [filteredProjects, setFilteredProjects] =
    useState<Projects>(recentProjects)
  // console.log(filteredProjects)
  const handleFilteredProjects = async () => {
    const skillTagId = asPath.split("=")[1]

    // URL handling
    const urlFilters = `filters[skillTags][id][$eq]=${skillTagId}`
    const urlSort = `sort[0]=datePublished:desc`
    const urlPopualte = `populate=*`
    let url = `${getStrapiUrl()}/api/projects`
    if (asPath.includes("?")) {
      url = `${url}?${urlFilters}&${urlSort}`
    } else {
      url = `${url}?${urlSort}`
    }
    url = `${url}&${urlPopualte}`

    // Fetch data and convert into JSON
    const res = await fetch(url)
    const newFilteredProjects = await res.json()
    setFilteredProjects(newFilteredProjects)
  }

  type GetQuery = (skillTagId: number) => string
  const getQuery: GetQuery = (skillTagId) => {
    const query = `?skill=${skillTagId}`
    if (asPath.includes(query)) {
      return "/portfolio"
    } else {
      return query
    }
  }

  useEffect(() => {
    handleFilteredProjects()
  }, [asPath])

  // For styling, get the show which skill tag is currently selected with alternate styling
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
            <Box>
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
                        scroll={false}
                        href={`${getQuery(skillTag.id)}`}
                        sx={{
                          variant: "links.tag",
                          borderColor: skillTagIsActive(skillTag.id)
                            ? "myPink"
                            : "black",
                          backgroundColor: skillTagIsActive(skillTag.id)
                            ? "myPink"
                            : "transparent"
                        }}
                      >
                        {skillTag.attributes.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Box>

            {/* Filtered projects results */}
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
      </main>
    </Layout>
  )
}

export default PortfolioIndexPage
