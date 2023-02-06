/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph, Box } from "theme-ui"
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
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <ul
                sx={{
                  // flex: "2",
                  m: 0,
                  mr: 4
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
              <Box
                sx={{
                  flex: "1 1",
                  // height: "150px",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  // border: " solid 2px black",
                  borderStyle: "solid",
                  borderWidth: "4px",
                  borderColor: "#1C1C1C",
                  position: "relative"
                }}
              >
                <Image
                  src="/placeholder.jpeg"
                  alt=""
                  fill
                  sx={{
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </Box>
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
        <section
          sx={{
            py: 3
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              Interested? Get in Touch
            </Heading>
          </Container>
        </section>
      </main>
    </Layout>
  )
}
