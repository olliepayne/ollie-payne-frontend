import Layout from "components/Layout"
import SEO from "components/SEO"
import Timeline from "components/Timeline"

// import { timelineEvents } from "../../../public/testData.json"

const TimelineIndexPage = () => {
  return (
    <Layout>
      <SEO title="My Experience" metaDescription="" />
      <main>
        <Timeline
          events={[
            {
              title: "SEO Analyst",
              institutionName: "Eightfold Technology",
              startDate: {
                month: "April",
                year: 2022
              },
              description: ""
            }
          ]}
        />
      </main>
    </Layout>
  )
}

export default TimelineIndexPage
