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
const timelineEventsUrlSort = "sort[0]=institutionName&sort[1]=startDate:desc"
const timelineEventsUrlPopulate = "populate=*"

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
      <SEO
        title="Experience: Front-End Development, SEO, and Everything Else"
        metaDescription="Everywhere that I have worked, and everything that I have learned while doing so."
      />
      <HeroSection h1="Experience" />
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        <section
          sx={{
            py: [4, 5]
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
