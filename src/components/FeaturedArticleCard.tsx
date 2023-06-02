/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph } from "theme-ui"
import Image from "next/image"
import Link from "next/link"

interface IFeaturedArticleCard {
  className?: string
}

const FeaturedArticleCard = ({ className }: IFeaturedArticleCard) => {
  return (
    <Box
      className={className}
      sx={{
        p: 3,
        bg: "myLightGray",
        boxShadow: "0 0 4px rgb(0 0 0 / 10%)",
        position: "relative"
      }}
    >
      <Box
        sx={{
          height: "250px",
          width: "100%",
          position: "relative",
          mb: 3
        }}
      >
        <Image
          src="/placeholder.jpeg"
          alt=""
          fill
          sx={{
            objectFit: "cover"
          }}
        />
      </Box>
      <Link
        href="/blog/slug"
        sx={{
          color: "black",
          transition: "all 0.2s ease",
          ":hover": {
            color: "gray"
          },
          "::after": {
            content: `""`,
            position: "absolute",
            inset: 0
          }
        }}
      >
        <Heading
          as="h4"
          variant="styles.h4"
          sx={{
            fontWeight: 400
          }}
        >
          How to Improve Finger Strength as a Rock Climber
        </Heading>
      </Link>
      <Paragraph>Lorem ipsum delor sit.</Paragraph>
    </Box>
  )
}

export default FeaturedArticleCard
