/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading, Text, Paragraph } from "theme-ui"
import ReactMarkdown from "react-markdown"
import BreadcrumbNav from "components/BreadcrumbNav"

// test data
import { blogPosts } from "../../../public/blogPosts.json"
const { pageTitle, metaDescription, h1, datePublished } = blogPosts[0]
import markdown from "../../../public/markdown.md"

// interface IBlogPostPage {
//   pageTitle: string
//   metaDescription: string
//   h1: string
// }

interface ICustomComponentProps {
  children: React.ReactNode | React.ReactNode[]
}
const components: any = {
  // using type any to save time -- not critical
  p: Paragraph,
  h2: ({ children }: ICustomComponentProps) => (
    <Heading
      as="h2"
      variant="styles.h2"
      sx={{
        mt: 4
      }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children }: ICustomComponentProps) => (
    <Heading
      as="h3"
      variant="styles.h3"
      sx={{
        mt: 4
      }}
    >
      {children}
    </Heading>
  )
}

const BlogPostPage = () => {
  return (
    <Layout>
      <SEO title={pageTitle} metaDescription={metaDescription} />
      <Container variant="narrow">
        <BreadcrumbNav />
      </Container>
      <article
        sx={{
          pb: 5
        }}
      >
        {/* metadata / frontmatter */}
        <section
          sx={
            {
              // py: 4
            }
          }
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
            <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
          </Container>
        </section>
      </article>
    </Layout>
  )
}

export default BlogPostPage
