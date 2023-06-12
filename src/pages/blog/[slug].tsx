/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Image from "next/image"
import { Box, Container, Heading, Text, Paragraph } from "theme-ui"
import ReactMarkdown from "react-markdown"
import BreadcrumbNav from "components/BreadcrumbNav"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import ContactSection from "components/ContactSection"
import { getStrapiUrl } from "helpers/api"
import { BlogPost } from "helpers/myTypes"
import { parseKebabDate } from "helpers/parseDate"

// interface IBlogPostPage {
//   pageTitle: string
//   metaDescription: string
//   h1: string
// }

// Markdown custom component
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
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`

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
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

interface IBlogPostPage {
  data: {
    data: {
      attributes: BlogPost
    }[]
  }
}

const BlogPostPage = ({ data: { data } }: IBlogPostPage) => {
  // console.log(props?.data?.data[0].attributes)

  // Destructure data
  const { pageTitle, metaDescription, h1, datePublished, dateEdited, content } =
    data[0].attributes
  const parsedDatePublished = parseKebabDate(datePublished, "SHORT")

  return (
    <Layout>
      <SEO title={pageTitle} metaDescription={"metaDescription"} />
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
