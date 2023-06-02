/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading } from "theme-ui"

const BlogPostPage = () => {
  return (
    <Layout>
      <SEO title="Article Title" metaDescription="Article description" />
      <main
        sx={{
          minHeight: "3000px"
        }}
      >
        <section
          sx={{
            py: 4
          }}
        >
          <Container>
            <Heading as="h1" variant="styles.h1"></Heading>
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
                  objectFit: "cover",
                  borderRadius: "8px"
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
