import Layout from "components/Layout"
import SEO from "components/SEO"
import Timeline from "components/Timeline"

const TimelineIndexPage = () => {
  return (
    <Layout>
      <SEO title="My Experience" metaDescription="" />
      <main>
        <Timeline />
      </main>
    </Layout>
  )
}

export default TimelineIndexPage
