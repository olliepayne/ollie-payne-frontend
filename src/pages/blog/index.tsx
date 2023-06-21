/** @jsxImportSource theme-ui */

// Third-party
import { useState } from "react"
import { GetStaticProps } from "next"
import { Container, Heading } from "theme-ui"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import HeroSection from "components/HeroSection"
import ArticleCard from "components/ArticleCard"

// Helpers
import { BlogPosts } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"

// Data fetching
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`
const resultsPerPage = 1

export const getStaticProps: GetStaticProps = async () => {
  const urlPagination = `?pagination[page]=1&pagination[pageSize]=${resultsPerPage}`
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
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState<BlogPosts>()
  const getNewResults = async () => {}

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
              {blogPosts.data
                .slice(0, resultsPerPage)
                .map((blogPost, index) => (
                  <li key={index}>
                    <ArticleCard blogPost={blogPost.attributes} />
                  </li>
                ))}
            </ul>
          </Container>

          <ul></ul>
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndexPage
