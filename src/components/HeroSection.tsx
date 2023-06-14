/** @jsxImportSource theme-ui */
import { Box } from "theme-ui"
import Image from "next/image"
import { useEffect, useState } from "react"

// Props
// Add: image
type HeroSection = {}

const HeroSection = () => {
  const [imageScale, setImageScale] = useState(1)
  let canUpdateImageScale = true
  const handleNewImageScale = () => {
    if (canUpdateImageScale) {
      const newImageScale = 1 + window.scrollY / 1500
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
            objectFit: "cover",
            objectPosition: "center -450px"
          }}
        />
      </Box>
    </section>
  )
}

export default HeroSection
