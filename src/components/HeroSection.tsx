/** @jsxImportSource theme-ui */
import { Box, Container, Heading, Flex } from "theme-ui"
import Image from "next/image"
import { useEffect, useState } from "react"
import { StrapiImage } from "helpers/myTypes"
import { getStrapiUrl } from "helpers/api"

// Props
// Change: not optional
type HeroSection = {
  h1: string
  heroImage?: StrapiImage
}

const HeroSection = ({ h1, heroImage }: HeroSection) => {
  // Review: maybe import hero images from strapi?
  // const getHeroImageUrl = () => getStrapiUrl() + heroImage.data.attributes.url

  const [imageScale, setImageScale] = useState(1)
  const maxImageScale = 1.5
  let canUpdateImageScale = true
  const handleNewImageScale = () => {
    // If we are back at the top of the window, allow scale updates otherwise there is a delay
    if (window.scrollY === 0) canUpdateImageScale = true

    // If we have reached the max scale, don't allow any more updates and return out of the function
    if (imageScale >= maxImageScale) {
      canUpdateImageScale = false
      return
    }

    if (canUpdateImageScale) {
      const newImageScale = 1 + window.scrollY / 1000
      setImageScale(newImageScale)
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", handleNewImageScale)
  }, [])

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
            // background:
            //   "linear-gradient(90deg, rgb(255 206 218 / 1) 50%, rgba(255 255 255 / 0) 100%)",
            background:
              "linear-gradient(90deg, rgb(0 0 0 / 0.5) 50%, rgba(255 255 255 / 0) 100%)",
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
