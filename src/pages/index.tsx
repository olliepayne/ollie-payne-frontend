/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph } from "theme-ui"
import Image from "next/image"
import Layout from "components/Layout"
import ContactSection from "components/ContactSection"
import { getStrapiUrl } from "helpers/api"
import { GetStaticProps } from "next"
import { Projects } from "helpers/myTypes"
import RecentProjectsSection from "components/RecentProjectsSection"
import LinkedInSVG from "components/svgs/LinkedInSVG"
import GithubSVG from "components/svgs/GithubSVG"

// Add: data fetching for headshot, hero image
const projectsUrl = `${getStrapiUrl()}/api/projects`

export const getStaticProps: GetStaticProps = async () => {
  const urlPagination =
    "sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
  const urlPopulate = "populate=*"
  const url = `${projectsUrl}?${urlPagination}&${urlPopulate}`
  const res = await fetch(url)
  const projects = await res.json()

  return {
    props: {
      projects
    }
  }
}

type Home = {
  projects?: Projects
}

export default function Home({ projects }: Home) {
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
              <ul
                sx={{
                  display: "inline-flex",
                  p: 0,
                  listStyle: "none",
                  "> li:not(:last-child)": {
                    mr: 3
                  }
                }}
              >
                <li>
                  <a
                    href="https://www.linkedin.com/in/oliverpayne01"
                    target="blank"
                    rel="nofollow"
                    sx={{
                      display: "inline-flex",
                      color: "black",
                      fontFamily: "body",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      alignItems: "center",
                      ":hover": {
                        color: "myPink"
                      }
                    }}
                  >
                    <LinkedInSVG
                      sx={{
                        width: "50px",
                        height: "50px"
                      }}
                    />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/olliepayne"
                    target="blank"
                    rel="nofollow"
                    sx={{
                      display: "inline-flex",
                      color: "black",
                      fontFamily: "body",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      alignItems: "center",
                      ":hover": {
                        color: "myPink"
                      }
                    }}
                  >
                    <GithubSVG
                      sx={{
                        width: "50px",
                        height: "50px",
                        mr: 1
                      }}
                    />
                    Github
                  </a>
                </li>
              </ul>
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

      <RecentProjectsSection projects={projects} />

      <ContactSection />
    </Layout>
  )
}
