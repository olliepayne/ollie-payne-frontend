/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Timeline from "components/Timeline"
import { getStrapiUrl } from "helpers/api"
import { TimelineEventData } from "helpers/myTypes"
import { Container } from "theme-ui"

// Data fetching
const timelineEventsUrl = `${getStrapiUrl()}/api/timeline-events?sort[0]=startDate:desc&sort[1]=endDate:desc`

export const getStaticProps = async () => {
  const res = await fetch(timelineEventsUrl)
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}

// Props
type TimelineIndexPage = {
  data: {
    data: TimelineEventData[]
  }
}

const TimelineIndexPage = (props: TimelineIndexPage) => {
  const timelineEvents = props.data.data

  return (
    <Layout>
      <SEO title="My Experience" metaDescription="" />
      {/* <BreadcrumbNav /> */}
      <main
        sx={{
          minHeight: "100vh"
        }}
      >
        <section
          sx={{
            py: 4
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

export default TimelineIndexPage
