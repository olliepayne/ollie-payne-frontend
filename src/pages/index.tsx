/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph } from "theme-ui"
import Image from "next/image"
import Layout from "components/Layout"
import ContactSection from "components/ContactSection"
import ProjectCard from "components/ProjectCard"
import { getStrapiUrl } from "helpers/api"
import { GetStaticProps } from "next"
import { Projects } from "helpers/myTypes"

// Add: data fetching for headshot, hero image, and projects
const projectsUrl = `${getStrapiUrl()}/api/projects`
const projectsUrlPagination =
  "?sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
const projectsUrlPopulate = "&populate=*"

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    projectsUrl + projectsUrlPagination + projectsUrlPopulate
  )
  const projects = await res.json()

  return {
    props: {
      projects
    }
  }
}

// Add: Props
type Home = {
  projects: Projects
}

export default function Home({ projects }: Home) {
  console.log(projects)

  return (
    <Layout>
      <SEO
        title="Ollie Payne - Frontend Developer & Digital Marketer"
        metaDescription="Description"
      />
      {/* Services / About me */}
      <section
        sx={{
          py: [4, 5]
        }}
      >
        <Container>
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: ["column", "row"]
            }}
          >
            <Container
              variant="narrow"
              sx={{
                ml: 0,
                pl: 0
              }}
            >
              <Heading
                as="h1"
                variant="styles.h1"
                sx={{
                  mt: 0
                }}
              >
                Hi, I'm Ollie.
              </Heading>
              <Heading as="h2" variant="styles.h2">
                What I am
              </Heading>
              <ul
                sx={{
                  pl: 3
                }}
              >
                <li>
                  <Heading as="h4">Front-End Developer</Heading>
                </li>
                <li>
                  <Heading as="h4">SEO Analyst</Heading>
                </li>
                <li>
                  <Heading as="h4">
                    Competitive Sport Climber and Boulderer
                  </Heading>
                </li>
              </ul>
              <Paragraph
                sx={{
                  mt: 3
                }}
              >
                I currently work and train out of Prescott, Arizona.
              </Paragraph>

              {/* Add: social links */}
            </Container>
            <Image
              src="/headshot-temp.jpeg"
              alt="Personal headshot of me, Oliver Payne"
              width={250}
              height={250}
              sx={{
                mt: [4, 0],
                objectFit: "cover",
                borderRadius: "50%",
                borderColor: "myGray",
                borderWidth: "4px",
                borderStyle: "solid"
              }}
            />
          </Flex>
        </Container>
      </section>

      {/* Projects */}
      <section
        sx={{
          // bg: "subtlePink",
          py: [4, 5]
        }}
      >
        <Container>
          <Heading
            as="h2"
            variant="styles.h2"
            sx={{
              textAlign: "center"
            }}
          >
            Recent Projects
          </Heading>
          <ul
            sx={{
              mt: 4,
              p: 0,
              listStyle: "none",
              "li:not(:first-child)": {
                my: 4
              }
            }}
          >
            {/* Map projects here */}
            {projects.data.map((project, index) => (
              <li key={project.attributes.slug}>
                <ProjectCard
                  project={project}
                  flipped={index > 0 && index % 2 === 1}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <ContactSection />
    </Layout>
  )
}
