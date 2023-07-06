/** @jsxImportSource theme-ui */
import { theme } from "theme"

// Packages
import { GetStaticPaths, GetStaticProps } from "next"
import { Container, Heading, Text, Box } from "theme-ui"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeRaw from "rehype-raw"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import BreadcrumbNav from "components/BreadcrumbNav"
import TemplatePageHeroImage from "components/TemplatePageHeroImage"
import SkillTagsList from "components/SkillTagsList"

// Helpers
import { Projects } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"
import { parsedKebabDate } from "helpers/dateParser"

// Data fetching
const projectsUrl = `${getStrapiUrl()}/api/projects`

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(projectsUrl)
  const projects = await res.json()

  const paths = projects.data.map((project: any) => {
    return {
      params: {
        slug: project.attributes.slug
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
  const url = `${projectsUrl}?${urlFilters}&${urlPopulate}`

  const res = await fetch(url)
  const projects = await res.json()

  return {
    props: {
      projects
    }
  }
}

type Props = {
  projects: Projects
}

const PortfolioSlugPage = ({ projects }: Props) => {
  const {
    pageTitle,
    metaDescription,
    hero,
    name,
    datePublished,
    skillTags,
    content
  } = projects.data[0].attributes

  // Alphabetically sort skill tags
  const sortedSkillTags = skillTags?.data.sort((a, b) => {
    if (a.attributes.name < b.attributes.name) {
      return -1
    }
    if (a.attributes.name > b.attributes.name) {
      return 1
    }
    return 0
  })

  const heroImageSrc = `${getStrapiUrl()}${hero.data.attributes.url}`
  const parsedDatePublished = parsedKebabDate(datePublished, "FULL")

  return (
    <Layout>
      <SEO title={pageTitle} metaDescription={metaDescription} />

      <Container>
        <BreadcrumbNav />
      </Container>

      <article
        sx={{
          pb: [4, 5]
        }}
      >
        {/* Hero -- Metadata / frontmatter */}
        <section>
          <Container variant="narrow">
            <Heading
              as="h1"
              variant="styles.h1"
              sx={{
                my: [4, 5]
              }}
            >
              {name}
            </Heading>
            <Box>
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
              <SkillTagsList
                skillTags={sortedSkillTags}
                sx={{
                  mt: 2
                }}
              />
            </Box>
          </Container>
          <Container>
            <TemplatePageHeroImage
              src={heroImageSrc}
              alt={hero.data.attributes.alternativeText}
            />
          </Container>
        </section>

        {/* Markdown */}
        <section>
          <Container variant="narrow">
            <ReactMarkdown sx={theme.styles} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </Container>
        </section>
      </article>
    </Layout>
  )
}

export default PortfolioSlugPage
