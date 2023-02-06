/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Flex } from "theme-ui"
import Link from "next/link"
import Image from "next/image"

interface IArticleCard {
  className?: string
}

const ArticleCard = ({ className }: IArticleCard) => {
  return (
    <Box
      className={className}
      sx={{
        p: 3,
        justifyContent: "space-between",
        ":hover": {
          cursor: "pointer",
          ".article-title": {
            color: "gray"
          }
        }
      }}
    >
      <Link
        href="/blog/slug"
        sx={{
          color: "unset",
          display: "inline-block",
          width: "100%"
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: "1 / 1",
            width: "100px",
            display: "inline-block",
            mr: 3
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
        <Box
          sx={{
            display: "inline-block",
            verticalAlign: "top"
          }}
        >
          <Heading
            className="article-title"
            as="h4"
            variant="styles.h4"
            sx={{
              fontWeight: 400,
              transition: "color 0.2s ease",
              textDecoration: "underline"
            }}
          >
            Title
          </Heading>
          <Paragraph>Snippet</Paragraph>
        </Box>
      </Link>
    </Box>
  )
}

export default ArticleCard
