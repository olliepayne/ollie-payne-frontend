/** @jsxImportSource theme-ui */
import { Container, Heading, Text, Box } from "theme-ui"
import Layout from "components/Layout"
import SEO from "components/SEO"
import { getStrapiUrl } from "helpers/api"
import { GetStaticPaths, GetStaticProps } from "next"
import { Projects } from "helpers/myTypes"
import BreadcrumbNav from "components/BreadcrumbNav"
import ContactSection from "components/ContactSection"
import TemplatePageHeroImage from "components/TemplatePageHeroImage"
import { parsedKebabDate } from "helpers/dateParser"
import Link from "next/link"

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
  // URL
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

// Props
type PortfolioSlugPage = {
  projects: Projects
}

const PortfolioSlugPage = ({ projects }: PortfolioSlugPage) => {
  const { pageTitle, metaDescription, hero, name, datePublished, skillTags } =
    projects.data[0].attributes
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
          pb: 5
        }}
      >
        {/* Hero -- Metadata / frontmatter */}
        <section>
          <Container variant="narrow">
            <Heading as="h1" variant="styles.h1">
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
              <Box
                sx={{
                  mt: 2
                }}
              >
                <Text
                  sx={{
                    mr: 2,
                    fontWeight: 500
                  }}
                >
                  Skills:
                </Text>
                <ul
                  sx={{
                    my: 0,
                    display: "inline-flex",
                    p: 0,
                    listStyle: "none",
                    "li:not(:last-child)": {
                      mr: 2
                    }
                  }}
                >
                  {sortedSkillTags?.map((skillTag, index) => (
                    <li key={`skillTags:${index}`}>
                      <Link
                        href={`/portfolio?skill=${skillTag.id}`}
                        sx={{
                          variant: "links.tag"
                        }}
                      >
                        {skillTag.attributes.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Box>
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
        {/* <section>
          <Container variant="narrow">
            <ReactMarkdown components={components}>{content}</ReactMarkdown>
          </Container>
        </section> */}
      </article>
      <ContactSection />
    </Layout>
  )
}

export default PortfolioSlugPage
