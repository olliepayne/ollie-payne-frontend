/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Flex, Container, Heading } from "theme-ui"
import ArticleCard from "components/ArticleCard"
import { InferGetStaticPropsType, GetStaticProps } from "next"
import { BlogPost } from "helpers/myTypes"

// Data fetching
const blogPostsUrl = `${process.env.STRAPI_API_URL}/api/blog-posts`

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(blogPostsUrl)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

const BlogIndexPage = ({
  data: { data, meta }
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                listStyleType: "none",
                rowGap: 3,
                columnGap: 3,
                p: 0,
                m: 0,
                li: {
                  flex: "0 1 33%"
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
