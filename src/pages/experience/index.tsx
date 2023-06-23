/** @jsxImportSource theme-ui */

// Third-party
import { GetStaticProps } from "next"
import { Container } from "theme-ui"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import HeroSection from "components/HeroSection"
import Timeline from "components/Timeline"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { TimelineEvents } from "helpers/myTypes"

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
      <HeroSection h1="Experience" />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        <section
          sx={{
            py: 5
          }}
        >
          <Container variant="narrow">
            <Timeline events={timelineEvents} />
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default ExperienceIndexPage
