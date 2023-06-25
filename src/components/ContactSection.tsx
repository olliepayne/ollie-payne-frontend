/** @jsxImportSource theme-ui */

// Packages
import { Container, Heading, Paragraph, Flex, Box } from "theme-ui"

const ContactSection = () => {
  return (
    <section
      sx={{
        py: [4, 5]
      }}
    >
      <Container>
        <Flex>
          <Box>
            <Heading as="h2" variant="styles.h2">
              How Can I Help?
            </Heading>
            <Paragraph>
              Don&apos;t hesitate to reach out. I&apos;d be happy to work with
              you to find a solution to your problem.
            </Paragraph>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "300px",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgb(0 0 0 / 0.05)"
            }}
          ></Box>
        </Flex>
      </Container>
    </section>
  )
}

export default ContactSection
