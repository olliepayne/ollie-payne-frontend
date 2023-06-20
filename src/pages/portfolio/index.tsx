/** @jsxImportSource theme-ui */
import { Heading, Box, Container, Button, Text } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { GetStaticProps } from "next"
import { getStrapiUrl } from "helpers/api"
import { Projects, SkillTags } from "helpers/myTypes"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProjectCard from "components/ProjectCard"
import HeroSection from "components/HeroSection"
import Link from "next/link"

// Root URLs
const projectsUrl = `${getStrapiUrl()}/api/projects`
const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

export const getStaticProps: GetStaticProps = async () => {
  const getRecentProjects = async () => {
    // URL handling
    const urlSort = "sort[0]=datePublished:desc"
    const urlPagination = "pagination[page]=1&pagination[pageSize]=5"
    const urlPopulate = "populate=*"
    const url = `${projectsUrl}?${urlSort}&${urlPagination}&${urlPopulate}`

    // Fetch the data and convert into JSON
    const res = await fetch(url)
    const recentProjects = await res.json()
    return recentProjects
  }
  const recentProjects = await getRecentProjects()

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
      recentProjects,
      skillTags
    }
  }
}

// Props
type PortfolioIndexPage = {
  recentProjects?: Projects
  skillTags?: SkillTags
}

const PortfolioIndexPage = ({
  recentProjects,
  skillTags
}: PortfolioIndexPage) => {
  const { asPath } = useRouter()

  // For pagination
  const pageSize = 1
  let resultsPage = 1
  const [resultsPageState, setResultsPageState] = useState(resultsPage)
  let canLoadMore = true

  const [filteredProjects, setFilteredProjects] = useState<
    Projects | undefined
  >(recentProjects)
  const handleGetFilteredProjects = async () => {
    const skillTagId = asPath.split("skill=")[1]

    // URL handling
    const urlFilters = `filters[skillTags][id][$eq]=${skillTagId}`
    const urlSort = `sort[0]=datePublished:desc`
    const urlPopualte = `populate=*`
    let url: string
    if (asPath.includes("?skill")) {
      url = `${projectsUrl}?${urlFilters}&${urlSort}&${urlPopualte}`
    } else {
      url = `${projectsUrl}?${urlSort}&${urlPopualte}`
    }

    // Fetch data and convert into JSON
    const res = await fetch(url)
    const newFilteredProjects = await res.json()
    setFilteredProjects(newFilteredProjects)

    checkCanLoadMore(newFilteredProjects.data.length)
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
    handleGetFilteredProjects()

    // Reset
    resultsPage = 1
    setResultsPageState(resultsPage)
  }, [asPath])

  const checkCanLoadMore = (newFilteredProjectsLength: number) => {
    if (resultsPage * pageSize >= newFilteredProjectsLength) {
      canLoadMore = false
    } else {
      canLoadMore = true
    }
  }

  const loadMoreResults = () => {
    if (canLoadMore) {
      resultsPage++
      setResultsPageState(resultsPage)
    }
  }

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
            <Heading as="h2" variant="styles.h2">
              Explore by Skills
            </Heading>

            {/* Tags */}
            <Box
              sx={{
                mt: 3
              }}
            >
              {skillTags && (
                <ul
                  sx={{
                    my: 0,
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
              {filteredProjects?.data
                .slice(0, resultsPageState * pageSize)
                .map((project, index) => (
                  <li key={`filteredProjects:${project.id}`}>
                    <ProjectCard
                      project={project}
                      flipped={index > 0 && index % 2 === 1 ? true : false}
                    />
                  </li>
                ))}
            </ul>

            {filteredProjects &&
              resultsPageState * pageSize < filteredProjects.data.length && (
                <Button
                  variant="secondary"
                  onClick={loadMoreResults}
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
