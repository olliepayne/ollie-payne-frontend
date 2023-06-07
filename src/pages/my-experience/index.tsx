/** @jsxImportSource theme-ui */
import Layout from "components/Layout"
import SEO from "components/SEO"
import Timeline from "components/Timeline"
import { Container } from "theme-ui"
import BreadcrumbNav from "components/BreadcrumbNav"

// import { timelineEvents } from "../../../public/testData.json"

const TimelineIndexPage = () => {
  return (
    <Layout>
      <SEO title="My Experience" metaDescription="" />
      <BreadcrumbNav />
      <main>
        <section
          sx={{
            py: 4
          }}
        >
          <Container variant="narrow">
            <Timeline
              events={[
                {
                  title: "SEO Analyst",
                  institutionName: "Eightfold Technology",
                  timeInvestment: "Contract",
                  startDate: {
                    month: "April",
                    year: 2022
                  },
                  description:
                    "Applied White Hat SEO strategies such as proper internal-linking structure, keyword research, competitive analysis, local SEO, page optimization, and site- audits for existing clients and leads. Combined SEO with Frontend development skills to optimize HTML structure and hardcode metadata."
                },
                {
                  title: "Jr Developer",
                  institutionName: "Eightfold Technology",
                  timeInvestment: "Full Time",
                  startDate: {
                    month: "October",
                    year: 2021
                  },
                  endDate: {
                    month: "April",
                    year: 2022
                  },
                  description:
                    "Applied White Hat SEO strategies such as proper internal-linking structure, keyword research, competitive analysis, local SEO, page optimization, and site- audits for existing clients and leads. Combined SEO with Frontend development skills to optimize HTML structure and hardcode metadata."
                }
              ]}
            />
          </Container>
        </section>
      </main>
    </Layout>
  )
}

export default TimelineIndexPage
