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
          filter: "drop-shadow(0 0 10px rgb(0 0 0 / 0.2))"
        }}
      />
    </Box>
  )
}

export default TemplatePageHeroImage
