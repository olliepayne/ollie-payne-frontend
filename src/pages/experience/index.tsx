/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Timeline from "components/Timeline"
import { getStrapiUrl } from "helpers/api"
import { TimelineEvents } from "helpers/myTypes"
import { Container, Heading } from "theme-ui"
import HeroSection from "components/HeroSection"
import { GetStaticProps } from "next"

// Data fetching
const timelineEventsUrl = `${getStrapiUrl()}/api/timeline-events`
const timelineEventsUrlSort = "sort[0]=startDate:desc&sort[1]=endDate:desc"
const timelineEventsUrlPopulate = "&populate=*"

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${timelineEventsUrl}?${timelineEventsUrlSort}&${timelineEventsUrlPopulate}`
  )
  const timelineEvents = await res.json()

  return {
    props: {
      timelineEvents
    }
  }
}

// Props
type ExperienceIndexPage = {
  timelineEvents: TimelineEvents
}

const ExperienceIndexPage = ({ timelineEvents }: ExperienceIndexPage) => {
  return (
    <Layout>
      <SEO title="My Experience" metaDescription="" />
      <HeroSection />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        <section>
          <Container>
            <Heading as="h1" variant="styles.h1">
              Experience
            </Heading>
          </Container>
        </section>
        <section>
          <Container variant="narrow">
            <Timeline events={timelineEvents} />
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default ExperienceIndexPage
