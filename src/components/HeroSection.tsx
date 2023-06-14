/** @jsxImportSource theme-ui */
import { Box } from "theme-ui"
import Image from "next/image"
import { useEffect, useState } from "react"

// Props
// Add: image
type HeroSection = {}

const HeroSection = () => {
  const [imageScale, setImageScale] = useState(1)
  const maxImageScale = 1.5
  let canUpdateImageScale = true
  const handleNewImageScale = () => {
    // - if we are back at the top of the window, allow scale updates otherwise there is a delay
    if (window.scrollY === 0) canUpdateImageScale = true

    // - if we have reached the max scale, don't allow any more updates and return out of the function
    if (imageScale >= maxImageScale) {
      canUpdateImageScale = false
      return
    }

    if (canUpdateImageScale) {
      const newImageScale = 1 + window.scrollY / 1000
      console.log(newImageScale)
      setImageScale(newImageScale)

      canUpdateImageScale = false
      setTimeout(() => {
        canUpdateImageScale = true
      }, 10)
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
          height: ["200px", "300px"],
          overflow: "hidden"
        }}
      >
        <span
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            heigh: "100%",
            inset: 0,
            background:
              "linear-gradient(135deg, rgb(255 206 218 / 0.6) 0%, rgba(255 255 255 / 0.6) 100%)",
            backdropFilter: "blur(6px)"
          }}
        />
        <Image
          src="/climbing-1.png"
          alt=""
          fill
          sx={{
            transform: `scale(${imageScale}, ${imageScale})`,
            objectFit: "cover"
          }}
        />
      </Box>
    </section>
  )
}

export default HeroSection
