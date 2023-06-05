/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading, Text } from "theme-ui"
import ReactMarkdown from "react-markdown"

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
      <article
        sx={{
          minHeight: "3000px"
        }}
      >
        {/* metadata / frontmatter */}
        <section
          sx={{
            // py: 4
          }}
        >
          <Container variant="narrow">
            <Heading as="h1" variant="styles.h1">
              {h1}
            </Heading>
            <Text
              sx={{
                fontStyle: "italic"
              }}
            >
              <time dateTime={datePublished}>{datePublished}</time>
            </Text>
          </Container>
          <Container>
            <Box
              sx={{
                position: "relative",
                height: ["250px", "400px"],
                my: 4
              }}
            >
              <Image
                src="/placeholder.jpeg"
                alt=""
                fill
                sx={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  filter: "drop-shadow(2px 2px 6px rgb(0 0 0 / 0.3))"
                }}
              />
            </Box>
          </Container>
        </section>

        {/* markdown / blog post content */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Container>
        </section>
      </article>
    </Layout>
  )
}

export default BlogPostPage
