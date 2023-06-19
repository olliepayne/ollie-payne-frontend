/** @jsxImportSource theme-ui */
import { Heading, Box, Container, Button } from "theme-ui"
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

// URLs
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
  const resultsPerPage = 5
  const [resultsPage, setResultsPage] = useState<number>(1)
  let canLoadMoreResults = true
  const handleFilteredProjects = async () => {
    const skillTagId = asPath.split("=")[1]

    // URL handling
    const urlFilters = `filters[skillTags][id][$eq]=${skillTagId}`
    const urlSort = `sort[0]=datePublished:desc`
    const urlPagination = `pagination[page]=${resultsPage}&pagination[pageSize]=${resultsPerPage}`
    const urlPopualte = `populate=*`
    let url = `${getStrapiUrl()}/api/projects`
    if (asPath.includes("?")) {
      url = `${url}?${urlFilters}&${urlSort}&${urlPagination}`
    } else {
      url = `${url}?${urlSort}&${urlPagination}`
    }
    url = `${url}&${urlPopualte}`

    // Fetch data and convert into JSON
    const res = await fetch(url)
    const newFilteredProjects = await res.json()
    if (newFilteredProjects.data.length > 0) {
      setFilteredProjects(newFilteredProjects)
    } else {
      canLoadMoreResults = false
    }
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

  const handleLoadMore = () => {
    if (canLoadMoreResults) setResultsPage(resultsPage + 1)
  }

  useEffect(() => {
    handleFilteredProjects()
  }, [asPath, resultsPage])

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

            {/* Add: map for pagination */}
            {/* Filtered projects results */}
            {filteredProjects && (
              <ul
                sx={{
                  my: 4,
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
            <Button
              variant="secondary"
              onClick={handleLoadMore}
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
