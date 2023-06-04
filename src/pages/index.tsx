/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph, Box } from "theme-ui"
import Image from "next/image"
// import FakeRegion from "components/FakeRegion"
import Layout from "components/Layout"

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Ollie Payne - Frontend Developer & Digital Marketer"
        metaDescription="Description"
      />
      <main>
        {/* Services / About me */}
        <section
          sx={{
            py: 3
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              What I am
            </Heading>
            <Flex
              sx={{
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <ul
                sx={{
                  pl: 3,
                  m: 0,
                  mr: 4
                }}
              >
                <li>
                  <Paragraph>SEO Analyst</Paragraph>
                </li>
                <li>
                  <Paragraph>Front-End Developer</Paragraph>
                </li>
                <li>
                  <Paragraph>Competitive sport climber and boulderer</Paragraph>
                </li>
              </ul>
              <Image
                src="/placeholder.jpeg"
                alt=""
                width={150}
                height={150}
                sx={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  borderStyle: "solid",
                  borderWidth: "4px",
                  borderColor: "#1C1C1C"
                }}
              />
            </Flex>
          </Container>
        </section>

        {/* Blog */}
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

        {/* Contact */}
        <section
          sx={{
            py: 3
          }}
        >
          <Container>
            <Heading as="h2" variant="styles.h2">
              How Can I Help?
            </Heading>
          </Container>
        </section>
      </main>
    </Layout>
  )
}
