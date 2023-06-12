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
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ContactSection from "components/ContactSection"

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

// Data fetching
const blogPostsUrl = `${process.env.STRAPI_API_URL}/api/blog-posts`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(blogPostsUrl)
  const payload = await res.json()

  const paths = payload.data.map((blogPost) => {
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
  const res = await fetch(`${blogPostsUrl}?filters[slug][$eq]=${params?.slug}`)
  // const res = await fetch(`${blogPostsUrl}/${params?.id}`)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

// Add: Types
const BlogPostPage = (props) => {
  // console.log(props?.data?.data[0].attributes)
  const blogPost = props?.data?.data[0].attributes

  return (
    <Layout>
      <SEO title={blogPost.pageTitle} metaDescription={metaDescription} />
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
              {blogPost.h1}
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

        {/* Markdown / blog post content */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown components={components}>{blogPost.content}</ReactMarkdown>
          </Container>
        </section>
      </article>

      {/* Contact */}
      <ContactSection />
    </Layout>
  )
}

export default BlogPostPage
