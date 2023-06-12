/** @jsxImportSource theme-ui */
import { Container, Heading, Paragraph } from "theme-ui"

const ContactSection = () => {
  return (
    <section
      sx={{
        py: [4, 5]
      }}
    >
      <Container>
        <Heading as="h2" variant="styles.h2">
          How Can I Help?
        </Heading>
        <Paragraph>
          Don't hesitate to reach out. I'd be happy to work with you to find a
          solution to your problem.
        </Paragraph>
      </Container>
    </section>
  )
}

export default ContactSection
