/** @jsxImportSource theme-ui */
import { theme } from "theme"

// Third-party
import { GetStaticPaths, GetStaticProps } from "next"
import { Container, Heading, Text } from "theme-ui"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import BreadcrumbNav from "components/BreadcrumbNav"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { BlogPost, BlogPosts } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import TemplatePageHeroImage from "components/TemplatePageHeroImage"

// Data fetching
const blogPostsUrl = `${getStrapiUrl()}/api/blog-posts`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(blogPostsUrl)
  const blogPosts = await res.json()

  const paths = blogPosts.data.map((blogPost: BlogPost) => {
    return {
      params: {
        slug: blogPost.attributes.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // URLs
  const urlFilters = `filters[slug][$eq]=${params?.slug}`
  const urlPopulate = "populate=*"
  const url = `${blogPostsUrl}?${urlFilters}&${urlPopulate}`

  const res = await fetch(url)
  const blogPosts = await res.json()

  return {
    props: {
      blogPosts
    }
  }
}

type Props = {
  blogPosts: BlogPosts
}

const BlogPostPage = ({ blogPosts }: Props) => {
  const {
    pageTitle,
    metaDescription,
    h1,
    hero,
    datePublished,
    dateEdited,
    content
  } = blogPosts.data[0].attributes

  const parsedDatePublished = parsedKebabDate(datePublished, "FULL")

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
        <section>
          <Container variant="narrow">
            <Heading as="h1" variant="styles.h1">
              {h1}
            </Heading>
            <Text
              sx={{
                color: "dateGray"
              }}
            >
              <time dateTime={datePublished}>
                {parsedDatePublished.month} {parsedDatePublished.day},{" "}
                {parsedDatePublished.year}
              </time>
            </Text>
          </Container>
          <Container>
            <TemplatePageHeroImage
              src={`${getStrapiUrl()}${hero.data.attributes.url}`}
              alt={`${getStrapiUrl()}${hero.data.attributes.alternativeText}`}
            />
          </Container>
        </section>

        {/* Markdown / blog post content */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown sx={theme.styles} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
          </Container>
        </section>
      </article>

      {/* Contact */}
    </Layout>
  )
}

export default BlogPostPage
