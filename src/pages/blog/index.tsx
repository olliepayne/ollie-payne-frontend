/** @jsxImportSource theme-ui */
import FeaturedArticleCard from "components/FeaturedArticleCard"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Flex, Container, Heading, Grid } from "theme-ui"
import ArticleCard from "components/ArticleCard"
import { InferGetStaticPropsType, GetStaticProps } from "next"

const blogPostsUrl = `${process.env.STRAPI_API_URL}/api/blog-posts`

type Data = {}

// rewrite as Typescript
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
                display: "grid",
                columnGap: 3,
                rowGap: 3,
                gridTemplateColumns: ["1", "repeat(3, 1fr)"],
                listStyleType: "none",
                p: 0,
                m: 0
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
