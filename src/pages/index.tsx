/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph, Box, Grid } from "theme-ui"
import Image from "next/image"
// import FakeRegion from "components/FakeRegion"
import Layout from "components/Layout"
import ContactSection from "components/ContactSection"
import ProjectCard from "components/ProjectCard"

// Add: data fetching for headshot, hero image, and projects

// Add: Props

export default function Home() {
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
          <Heading as="h1" variant="styles.h1">
            Hi, I'm Ollie.
          </Heading>
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

              {/* Review: does this still need to be here? */}
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
          bg: "subtlePink",
          // bg: "myLightGray",
          py: [4, 5],
          "li:not(:first-child)": {
            my: 5
          }
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
              listStyle: "none"
            }}
          >
            {/* Map projects here */}
            <li>
              <ProjectCard />
            </li>
            <li>
              <ProjectCard flipped />
            </li>
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <ContactSection />
    </Layout>
  )
}
