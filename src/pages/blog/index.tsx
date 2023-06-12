/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Flex, Container, Heading } from "theme-ui"
import ArticleCard from "components/ArticleCard"
import { GetStaticProps } from "next"
import { BlogPostData, Meta } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"

// Data fetching
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`

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
type IBlogIndexPage = {
  blogPosts: {
    data: BlogPostData[]
    meta: Meta
  }
}

const BlogIndexPage = ({ blogPosts: { data, meta } }: IBlogIndexPage) => {
  return (
    <Layout>
      <SEO title="Blog | Ollie Payne" metaDescription="" />
      <main>
        <section
          sx={{
            py: 3
          }}
        >
          <Container>
            <Heading as="h1" variant="styles.h1">
              Blog
            </Heading>
            <Heading
              as="h3"
              variant="styles.h3"
              sx={{
                mb: 2
              }}
            >
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
              {data.map((blogPost, index) => (
                <li key={index}>
                  <ArticleCard blogPost={blogPost.attributes} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <section
        sx={{
          py: 3
        }}
      >
        <Container>
          <Heading
            as="h3"
            variant="styles.h3"
            sx={{
              mb: 2
            }}
          >
            Explore Categories
          </Heading>
        </Container>
      </section>
    </Layout>
  )
}

export default BlogIndexPage
