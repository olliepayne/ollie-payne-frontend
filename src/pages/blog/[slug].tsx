/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading, Text } from "theme-ui"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import { blogPosts } from "../../../public/blogPosts.json"
const { pageTitle, metaDescription, h1, datePublished } = blogPosts[0]

import markdown from "../../../public/markdown.md"

// interface IBlogPostPage {
//   pageTitle: string
//   metaDescription: string
//   h1: string
// }

const BlogPostPage = () => {
  return (
    <Layout>
      <SEO title={pageTitle} metaDescription={metaDescription} />
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
          <Container variant="narrow">
            <Heading as="h1" variant="styles.h1">
              {h1}
            </Heading>
            <Text>
              <time dateTime={datePublished}>{datePublished}</time>
            </Text>
          </Container>
          <Container>
            <Box
              sx={{
                position: "relative",
                height: ["250px", "400px"],
                my: [4, 5]
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

        {/* Markdown */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown children={markdown} />
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default BlogPostPage
