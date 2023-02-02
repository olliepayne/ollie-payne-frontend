/** @jsxImportSource theme-ui */
import Header from "components/Header"
import SEO from "components/SEO"
import Footer from "components/Footer"
import { Container, Heading, Flex, Paragraph } from "theme-ui"
import Image from "next/image"
import FakeRegion from "components/FakeRegion"

export default function Home() {
  return (
    <>
      <SEO
        title="Ollie Payne - Digital Marketer"
        metaDescription="Description"
      />
      <Header />
      <main
        sx={{
          minHeight: "3000px"
        }}
      >
        <section
          sx={{
            py: 3
          }}
        >
          <FakeRegion id="about-me" />
          <Container>
            <Heading as="h2" variant="styles.h2">
              About me
            </Heading>
            <Flex
              sx={{
                justifyContent: "space-between"
              }}
            >
              <ul>
                <li>
                  <Paragraph>SEO Specialist</Paragraph>
                </li>
                <li>
                  <Paragraph>Web Developer</Paragraph>
                </li>
                <li>
                  <Paragraph>Competitive sport climber and boulderer</Paragraph>
                </li>
              </ul>
              {/* <Image src={} /> */}
            </Flex>
          </Container>
        </section>
        <section
          sx={{
            py: 3
          }}
        >
          <FakeRegion id="my-work" />
          <Container>
            <Heading as="h2" variant="styles.h2">
              My Work
            </Heading>
          </Container>
        </section>
        <section
          sx={{
            py: 3
          }}
        >
          <FakeRegion id="reach-out" />
          <Container>
            <Heading as="h2" variant="styles.h2">
              Reach out
            </Heading>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
