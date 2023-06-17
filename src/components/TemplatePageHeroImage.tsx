/** @jsxImportSource theme-ui */
import { Box } from "theme-ui"
import Image from "next/image"

// Props
type TemplatePageHeroImage = {
  src: string
  alt: string
}

const TemplatePageHeroImage = ({ src, alt }: TemplatePageHeroImage) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: ["250px", "400px"],
        my: 4
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sx={{
          objectFit: "cover",
          borderRadius: "8px",
          filter: "drop-shadow(2px 2px 6px rgb(0 0 0 / 0.3))"
        }}
      />
    </Box>
  )
}

export default TemplatePageHeroImage