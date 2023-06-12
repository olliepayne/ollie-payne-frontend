/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph, Box, Text } from "theme-ui"
import Image from "next/image"
// import FakeRegion from "components/FakeRegion"
import Layout from "components/Layout"
import ContactSection from "components/ContactSection"

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
              <Paragraph
                sx={{
                  mt: 3
                }}
              >
                Hi, I’m Ollie. I have been coding since I was a young teen
                working on indie games. I got into front-end development after
                teaching myself post-high school, while also training at
                the climbing gym that I then worked at. Since then, I have
                improved my craft through professional experience and have been
                fortunate enough to improve finer details of my Front-End
                ability by spending some time working as an SEO Analyst. I currently work and
                train out of Prescott, Arizona.
              </Paragraph>
            </Container>
            <Image
              src="/placeholder.jpeg"
              alt=""
              width={200}
              height={200}
              sx={{
                mt: [4, 0],
                objectFit: "cover",
                borderRadius: "50%",
                borderStyle: "solid",
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
          py: [4, 5]
        }}
      >
        <Container>
          <Heading as="h2" variant="styles.h2">
            My Favorite Projects
          </Heading>
        </Container>
      </section>

      {/* Contact */}
      <ContactSection />
    </Layout>
  )
}
