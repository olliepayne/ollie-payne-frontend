/** @jsxImportSource theme-ui */

// Third-party
import { Box, Container, Heading, Text } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import ReactMarkdown from "react-markdown"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import ContactSection from "components/ContactSection"
import BreadcrumbNav from "components/BreadcrumbNav"
import { components } from "components/ReactMarkdownComponents"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { BlogPost, BlogPosts } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"

// Data fetching
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(blogPostsUrl)
  const blogPosts = await res.json()

  const paths = blogPosts.data.map((blogPost: BlogPost) => {
    return {
      params: {
        slug: blogPost.attributes.slug,
        id: blogPost.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogPostsUrlFilters = `?filters[slug][$eq]=${params?.slug}`
  const res = await fetch(blogPostsUrl + blogPostsUrlFilters)
  const blogPost = await res.json()

  return {
    props: {
      blogPost
    }
  }
}

// Props
type BlogPostPage = {
  blogPosts: BlogPosts
}

const BlogPostPage = ({ blogPosts }: BlogPostPage) => {
  // - Destructure data
  const { pageTitle, metaDescription, h1, datePublished, dateEdited, content } =
    blogPosts.data[0].attributes

  const parsedDatePublished = parsedKebabDate(datePublished, "SHORT")

  return (
    <Layout>
      <SEO title={pageTitle} metaDescription={metaDescription} />
      <Container>
        <BreadcrumbNav />
      </Container>
      <article
        sx={{
          pb: 5
        }}
      >
        {/* Metadata / frontmatter */}
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
            <Text>
              <time dateTime={datePublished}>
                {parsedDatePublished.month.toUpperCase()}{" "}
                {parsedDatePublished.day}, {parsedDatePublished.year}
              </time>
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

        {/* Markdown / blog post content */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
          </Container>
        </section>
      </article>

      {/* Contact */}
      <ContactSection />
    </Layout>
  )
}

export default BlogPostPage
