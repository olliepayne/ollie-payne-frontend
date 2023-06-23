/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Heading, Flex, ThemeUIStyleObject } from "theme-ui"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import HeroSection from "components/HeroSection"
import ArticleCard from "components/ArticleCard"

// Helpers
import { BlogPosts } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"
import PaginationControl from "components/PaginationControl"

// Data fetching
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`
const resultsPerPage = 1

// Initial Data fetching
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(blogPostsUrl)
  const blogPosts = await res.json()
  return {
    props: {
      blogPosts
    }
  }
}

// Props
type BlogIndexPage = {
  blogPosts: BlogPosts
}

const BlogIndexPage = ({ blogPosts }: BlogIndexPage) => {
  console.log(blogPosts)

  const { asPath } = useRouter()

  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [filterdBlogPosts, setFilteredBlogPosts] =
    useState<BlogPosts>(blogPosts)
  const getNewResults = async () => {
    let newPageNumber = 1

    // Check if the user is querying a specific page
    if (asPath.includes("results")) {
      newPageNumber = parseInt(asPath.split("results=")[1])
      if (newPageNumber !== currentPageNumber) {
      }
    }
    setCurrentPageNumber(newPageNumber)
  }

  useEffect(() => {
    getNewResults()
  }, [asPath])

  return (
    <Layout>
      <SEO title="Blog | Ollie Payne" metaDescription="" />
      <HeroSection h1="Blog" />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        <section
          sx={{
            py: 5
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              Recent Articles
            </Heading>
            <ul
              sx={{
                display: "grid",
                justifyContent: "flex-start",
                listStyleType: "none",
                gridTemplateColumns: ["1fr", "repeat(3, 1fr)"],
                rowGap: 3,
                columnGap: 3,
                p: 0,
                m: 0,
                li: {
                  flex: "0 1 1fr"
                }
              }}
            >
              {/* {results?.data.slice(0, resultsPerPage).map((blogPost, index) => (
                <li key={index}>
                  <ArticleCard blogPost={blogPost} />
                </li>
              ))} */}
            </ul>
          </Container>

          {/* Pagination control */}
          {/* <PaginationControl
            pagesToCreate={blogPosts.meta.pagination.total}
            currentPage={currentPageNumber}
          /> */}
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndexPage
