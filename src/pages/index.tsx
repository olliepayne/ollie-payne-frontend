/** @jsxImportSource theme-ui */
import SEO from "components/SEO"
import { Container, Heading, Flex, Paragraph, Box, Text } from "theme-ui"
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
                    <Text>SEO Analyst</Text>
                  </li>
                  <li>
                    <Text>Front-End Developer</Text>
                  </li>
                  <li>
                    <Text>Competitive sport climber and boulderer</Text>
                  </li>
                </ul>
                <Paragraph
                  sx={{
                    mt: 3
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  molestie tristique lorem a finibus. Praesent vel dui nec metus
                  vulputate hendrerit ornare nec purus. Mauris sagittis augue
                  enim, id suscipit turpis convallis sed. Pellentesque molestie
                  semper magna vel sodales. Aliquam erat volutpat.
                </Paragraph>
              </Container>
              <Image
                src="/placeholder.jpeg"
                alt=""
                width={150}
                height={150}
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

        {/* Blog */}
        <section
          sx={{
            bg: "myLightGray",
            py: [4, 5]
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
            py: [4, 5]
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
