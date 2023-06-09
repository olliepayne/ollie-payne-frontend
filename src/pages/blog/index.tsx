/** @jsxImportSource theme-ui */
import FeaturedArticleCard from "components/FeaturedArticleCard"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Flex, Container, Heading, Grid } from "theme-ui"
import ArticleCard from "components/ArticleCard"
import type { InferGetStaticPropsType, GetStaticProps } from "next"

const blogPostsUrl = `${process.env.STRAPI_URL}/api/blog-posts`
// console.log(blogPostsUrl)
// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch("http://localhost:1337/api/blog-posts")
//   const data = await res.json()
//   return {
//     props: {
//       data
//     }
//   }
// }

const BlogIndexPage = () => {
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
              <li
                sx={
                  {
                    // gridColumn: "auto"
                  }
                }
              >
                <ArticleCard />
              </li>
              <li>
                <ArticleCard />
              </li>
              <li>
                <ArticleCard />
              </li>
            </ul>
          </Container>
        </section>
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
      </main>
    </Layout>
  )
}

export default BlogIndexPage
