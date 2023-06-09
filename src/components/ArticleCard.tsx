/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Flex } from "theme-ui"
import Link from "next/link"
import Image from "next/image"

type BlogPost = {
  slug: string
  pageTitle: string
  datePublished: string
  h1: string
  content: string
}

interface IArticleCard {
  className?: string
  blogPost: BlogPost
}

const ArticleCard = ({ className, blogPost }: IArticleCard) => {
  console.log(blogPost)

  return (
    <article
      className={className}
      sx={{
        p: 3,
        justifyContent: "space-between",
        position: "relative",
        bg: "myLightGray",
        ":hover": {
          cursor: "pointer",
          ".article-title": {
            color: "gray"
          }
        }
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: ["150px", "250px"],
          width: "100%"
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
        <Link
          href="/blog/slug"
          sx={{
            color: "unset",
            display: "block",
            "::after": {
              content: `""`,
              inset: 0,
              position: "absolute"
            }
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
            {blogPost.pageTitle}
          </Heading>
        </Link>
        <Paragraph>Snippet</Paragraph>
      </Box>
    </article>
  )
}

export default ArticleCard
