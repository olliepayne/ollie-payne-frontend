/** @jsxImportSource theme-ui */

// Packages
import { Box, Container, Heading } from "theme-ui"

type Props = {
  h1: string
}

const HeroSection = ({ h1 }: Props) => {
  return (
    <section
      sx={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <span
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          // background:
          //   "radial-gradient(circle, rgba(255,241,245,1) 25%, rgba(240,240,240,1) 50%, rgba(255,206,218,1) 100%)"
          bg: "#F0F0F0"
        }}
      />
      <Container
        sx={{
          py: [4, 5]
        }}
      >
        <Heading
          as="h1"
          variant="styles.h1"
          sx={{
            my: 0
          }}
        >
          {h1}
        </Heading>
      </Container>
    </section>
  )
}

export default HeroSection
