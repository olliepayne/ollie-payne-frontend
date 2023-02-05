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
        // aspectRatio: "1 / 1",
        bg: "subtlePink",
        boxShadow: "0 0 4px rgb(0 0 0 / 10%)"
      }}
    >
      <Link href="#">
        <Heading as="h4" variant="styles.h4">
          Title
        </Heading>
      </Link>
      <Paragraph>snippet</Paragraph>
    </Box>
  )
}

export default FeaturedArticleCard
