/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading } from "theme-ui"

const BlogPostPage = () => {
  return (
    <Layout>
      <SEO title="Article Title" metaDescription="Article description" />
      <main>
        <section
          sx={{
            py: 4
          }}
        >
          <Container variant="narrow">
            <Heading as="h1" variant="styles.h1">
              Article Title
            </Heading>
          </Container>
          <Container>
            <Box
              sx={{
                position: "relative",
                height: "400px"
              }}
            >
              <Image
                src="/placeholder.jpeg"
                alt=""
                fill
                sx={{
                  objectFit: "cover"
                }}
              />
            </Box>
          </Container>
        </section>
        <section>{/* parse markdown here */}</section>
      </main>
    </Layout>
  )
}

export default BlogPostPage
