/** @jsxImportSource theme-ui */

// Packages
import { useState } from "react"
import Image from "next/image"
import { Box, Container, Heading, Flex } from "theme-ui"

// Helpers
import { StrapiImage } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"

type Props = {
  h1: string
  heroImage?: StrapiImage
}

const HeroSection = ({ h1, heroImage }: Props) => {
  // Review: maybe import hero images from strapi?
  // const getHeroImageUrl = () => getStrapiUrl() + heroImage.data.attributes.url

  const [imageScale, setImageScale] = useState(1)
  const maxImageScale = 1.5
  const handleNewImageScale = () => {
    // If we have reached the max scale, don't allow any more updates and return out of the function
    if (imageScale < maxImageScale) {
      const newImageScale = 1 + window.scrollY / 1000
      setImageScale(newImageScale)
    }
  }
  if (typeof window !== "undefined") {
    document.addEventListener("scroll", handleNewImageScale)
  }

  return (
    <section>
      <Box
        sx={{
          position: "relative",
          height: ["200px", "400px"],
          overflow: "hidden"
        }}
      >
        <span
          sx={{
            position: "absolute",
            zIndex: -1,
            width: "100%",
            height: "100%",
            inset: 0,
            background:
              "linear-gradient(90deg, rgb(0 0 0 / 0.75) 50%, rgba(255 255 255 / 0) 100%)",
            backgroundColor: "rgb(0 0 0 / 0.3)",
            backdropFilter: "blur(4px)"
          }}
        />
        <Image
          src="/climbing-1.png"
          alt=""
          fill
          sx={{
            transform: `scale(${imageScale}, ${imageScale})`,
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            zIndex: -2
          }}
        />
        <Container
          sx={{
            height: "100%"
          }}
        >
          <Flex
            sx={{
              alignItems: "center",
              height: "100%"
            }}
          >
            <Heading
              as="h1"
              variant="styles.h1"
              sx={{
                color: "white",
                my: 0
              }}
            >
              {h1}
            </Heading>
          </Flex>
        </Container>
      </Box>
    </section>
  )
}

export default HeroSection
