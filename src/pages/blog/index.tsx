/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Heading, Flex } from "theme-ui"

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
  // console.log(blogPosts)

  const { asPath } = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState<BlogPosts | undefined>()
  const getNewResults = async () => {
    let newPageNumber = 1
    if (asPath.includes("results")) {
      newPageNumber = parseInt(asPath.split("results=")[1])
    }
    setCurrentPage(newPageNumber)

    // URLs
    const urlSort = `sort[0]=datePublished:desc`
    const urlPagination = `pagination[page]=${newPageNumber}&pagination[pageSize]=${resultsPerPage}`
    const url = `${blogPostsUrl}?${urlSort}&${urlPagination}`

    const res = await fetch(url)
    const newBlogPosts = await res.json()
    setResults(newBlogPosts)
  }

  useEffect(() => {
    getNewResults()
  }, [asPath])

  const createPaginationArray = () => {
    let array: number[] = []
    for (let i = 0; i < blogPosts.meta.pagination.total; i++) {
      array.push(i + 1)
    }

    return array
  }
  const [paginationArray, setPaginationArray] = useState<number[]>(
    createPaginationArray()
  )

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
              {results?.data.slice(0, resultsPerPage).map((blogPost, index) => (
                <li key={index}>
                  <ArticleCard blogPost={blogPost} />
                </li>
              ))}
            </ul>
          </Container>

          {/* Pagination control */}
          <Flex
            sx={{
              justifyContent: "center"
            }}
          >
            <ul
              sx={{
                my: 5,
                display: "inline-flex",
                p: 0,
                listStyle: "none",
                "> li:not(:last-child)": {
                  mr: 4
                }
              }}
            >
              {/* Previous */}
              <li>
                <Link
                  href={`?results=${currentPage - 1}`}
                  sx={{
                    visibility: currentPage > 1 ? "visible" : "hidden",
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    fontFamily: "body",
                    fontSize: 2
                  }}
                >
                  {"<"}
                </Link>
              </li>
              {paginationArray.map((pageNumber) => (
                <li key={`paginationLinks:${pageNumber}`}>
                  <Link
                    href={`?results=${pageNumber}`}
                    sx={{
                      display: "inline-block",
                      textDecoration: "none",
                      color: "black",
                      fontWeight: 500,
                      fontFamily: "body",
                      position: "relative",
                      zIndex: 1,
                      fontSize: 2,
                      ":hover": {
                        "> span": {
                          backgroundColor: "myPink"
                        }
                      }
                    }}
                  >
                    <span
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "35px",
                        height: "35px",
                        backgroundColor: asPath.includes(
                          `results=${pageNumber}`
                        )
                          ? "subtlePink"
                          : "transparent",
                        borderRadius: "50%",
                        zIndex: -1,
                        transition: "background-color 0.2s ease-out"
                      }}
                    />
                    {pageNumber}
                  </Link>
                </li>
              ))}
              {/* Next */}
              <li>
                <Link
                  href={`?results=${currentPage + 1}`}
                  sx={{
                    visibility:
                      currentPage < paginationArray.length
                        ? "visible"
                        : "hidden",
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    fontFamily: "body",
                    fontSize: 2
                  }}
                >
                  {">"}
                </Link>
              </li>
            </ul>
          </Flex>
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndexPage
