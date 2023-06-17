/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import { getStrapiUrl } from "helpers/api"
import { GetStaticPaths, GetStaticProps } from "next"
import { Projects } from "helpers/myTypes"
import { Container, Heading, Text } from "theme-ui"
import BreadcrumbNav from "components/BreadcrumbNav"
import ContactSection from "components/ContactSection"
import TemplatePageHeroImage from "components/TemplatePageHeroImage"
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
  const projectsUrlFilters = `?filters[slug][$eq]=${params?.slug}`
  const projectsUrlPopulate = "&populate=*"
  const res = await fetch(
    projectsUrl + projectsUrlFilters + projectsUrlPopulate
  )
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
  const { pageTitle, metaDescription, hero, name, datePublished, projectTags } =
    projects.data[0].attributes
  // console.log(projectTags?.data[0].attributes)

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
            <Text>
              <time dateTime={datePublished}>
                {parsedDatePublished.month} {parsedDatePublished.day},{" "}
                {parsedDatePublished.year}
              </time>
            </Text>
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
