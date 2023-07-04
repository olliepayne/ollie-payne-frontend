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
const urlSort = `sort[0]=datePublished:desc`
const urlPopulate = "populate=*"

// Initial Data fetching
export const getStaticProps: GetStaticProps = async () => {
  // URLs
  const urlPagination = `pagination[page]=1&pagination[pageSize]=${resultsPerPage}`
  const url = `${blogPostsUrl}?${urlSort}&${urlPagination}&${urlPopulate}`

  const res = await fetch(url)
  const data = await res.json()
  return {
    props: {
      blogPosts: data
    }
  }
}

type Props = {
  blogPosts: BlogPosts
}

const BlogIndexPage = ({ blogPosts }: Props) => {
  const { asPath } = useRouter()

  // For pagination
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  const [paginatedBlogPosts, setPaginatedBlogPosts] =
    useState<BlogPosts>(blogPosts)

  useEffect(() => {
    const handleUpdatePageNumber = async () => {
      let newPageNumber = 1

      // Check if the user is querying a specific page
      if (asPath.includes("results")) {
        newPageNumber = parseInt(asPath.split("results=")[1])
        if (newPageNumber !== currentPageNumber) {
          const urlPagination = `pagination[page]=${newPageNumber}&pagination[pageSize]=${resultsPerPage}`
          const url = `${blogPostsUrl}?${urlSort}&${urlPagination}&${urlPopulate}`

          const res = await fetch(url)
          const data = await res.json()
          setPaginatedBlogPosts(data)
        }
      }

      setCurrentPageNumber(newPageNumber)
    }
    handleUpdatePageNumber()
  }, [asPath])

  return (
    <Layout>
      <SEO
        title="Blog"
        metaDescription="What I'm up to, tutorials, and trends in Front-End Development and SEO."
      />
      {/* <HeroSection h1="Blog" /> */}
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
              {paginatedBlogPosts &&
                paginatedBlogPosts.data.map((blogPost) => (
                  <li key={`blogPosts:${blogPost.id}`}>
                    <ArticleCard blogPost={blogPost} />
                  </li>
                ))}
            </ul>
          </Container>

          {/* Pagination control */}
          <PaginationControl
            pagesToCreate={blogPosts.meta.pagination.total}
            currentPageNumber={currentPageNumber}
          />
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndexPage
