/** @jsxImportSource theme-ui */

// Packages
import Image from "next/image"
import { Box } from "theme-ui"

type Props = {
  src: string
  alt: string
}

const TemplatePageHeroImage = ({ src, alt }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: ["250px", "500px"],
        my: [4, 5]
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sx={{
          objectFit: "cover",
          borderRadius: "8px",
          filter: "drop-shadow(0 0 20px rgb(0 0 0 / 0.1))"
        }}
      />
    </Box>
  )
}

export default TemplatePageHeroImage
