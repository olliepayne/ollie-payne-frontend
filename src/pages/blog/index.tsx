/** @jsxImportSource theme-ui */
import FeaturedArticleCard from "components/FeaturedArticleCard"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { Flex, Container, Heading } from "theme-ui"

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
            <Heading
              as="h3"
              variant="styles.h3"
              sx={{
                mb: 2
              }}
            >
              Featured Articles
            </Heading>
            <Flex
              sx={{
                justifyContent: "space-between",
                flexDirection: ["column", "row"]
              }}
            >
              <FeaturedArticleCard
                sx={{
                  flex: "2",
                  mr: 4
                }}
              />
              <ul
                sx={{
                  flex: "1",
                  listStyleType: "none",
                  p: 0
                }}
              >
                <li>post</li>
              </ul>
            </Flex>
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
              Filter
            </Heading>
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default BlogIndexPage
