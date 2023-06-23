/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import { Heading, Box, Container, Button } from "theme-ui"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import ProjectCard from "components/ProjectCard"
import HeroSection from "components/HeroSection"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { Projects, SkillTags } from "helpers/myTypes"
import SkillTagsList from "components/SkillTagsList"

// Root URLs
const projectsUrl = `${getStrapiUrl()}/api/projects`
const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`

export const getStaticProps: GetStaticProps = async () => {
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
      skillTags
    }
  }
}

// Props
type Props = {
  skillTags: SkillTags
}

const PortfolioIndexPage = ({ skillTags }: Props) => {
  const { asPath } = useRouter()

  // For pagination
  const pageSize = 1
  let resultsPage = 1
  const [resultsPageState, setResultsPageState] = useState(resultsPage)
  let canLoadMore = true

  const [filteredProjects, setFilteredProjects] = useState<Projects>()
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

  useEffect(() => {
    handleGetFilteredProjects()

    // Reset
    setResultsPageState(1)
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
              onClick={loadMoreResults}
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
