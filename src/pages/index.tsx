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
      {/* Review: This entire section */}
      {/* Hero image */}
      <section
        sx={{
          py: 5,
          overflow: "hidden"
        }}
      >
        <Container>
          <Flex
            sx={{
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                mr: 5,
                height: "300px",
                flex: "1 1 50%",
                position: "relative"
              }}
            >
              {/* Gray overylay */}
              {/* <span
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                zIndex: 1,
                backgroundColor: "rgb(0 0 0 / 0.25)",
                backdropFilter: "blur(8px)"
              }}
            /> */}
              <Image
                src="/placeholder.jpeg"
                alt=""
                fill
                sx={{
                  position: "absolute",
                  inset: 0,
                  objectFit: "cover"
                }}
              />
            </Box>
            <Box
              sx={{
                flex: "1 1 50%",
                height: "100%",
                alignItems: "center",
                position: "relative",
                zIndex: 1
              }}
            >
              <Heading as="h1" variant="styles.h1">
                Hi, I'm Ollie.
              </Heading>
              {/* Add: social links here */}
              <ul
                sx={{
                  p: 0,
                  listStyle: "none"
                }}
              ></ul>
            </Box>
          </Flex>
        </Container>
      </section>

      {/* Services / About me */}
      <section
        sx={{
          py: [4, 5]
        }}
      >
        <Container>
          <Heading as="h2" variant="styles.h2">
            What I am
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
            </Container>
            <Image
              src="/headshot-temp.jpeg"
              alt="Personal headshot of me, Oliver Payne"
              width={250}
              height={250}
              sx={{
                mt: [4, 0],
                objectFit: "cover",
                borderRadius: "10px",
                // borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "#1C1C1C"
              }}
            />
          </Flex>
        </Container>
      </section>

      {/* Projects */}
      <section
        sx={{
          bg: "myLightGray",
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
