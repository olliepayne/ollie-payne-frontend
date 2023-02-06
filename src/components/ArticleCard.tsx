/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph } from "theme-ui"
import Link from "next/link"

const ArticleCard = () => {
  return (
    <Box>
      <Link
        href="/blog/slug"
        sx={{
          color: "black",
          transition: "all 0.2s ease",
          ":hover": {
            color: "gray"
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
          Title
        </Heading>
      </Link>
      <Paragraph>Snippet</Paragraph>
    </Box>
  )
}

export default ArticleCard
