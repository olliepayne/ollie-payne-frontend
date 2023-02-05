/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph } from "theme-ui"
import Image from "next/image"
import FakeRegion from "components/FakeRegion"
import Layout from "components/Layout"

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Ollie Payne - Digital Marketer"
        metaDescription="Description"
      />
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
          <Container>
            <Heading as="h2" variant="styles.h2">
              About me
            </Heading>
            <Flex
              sx={{
                justifyContent: "space-between"
              }}
            >
              <ul
                sx={{
                  m: 0
                }}
              >
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
            bg: "myLightGray",
            py: 3
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              Blog
            </Heading>
          </Container>
        </section>
      </main>
    </Layout>
  )
}
