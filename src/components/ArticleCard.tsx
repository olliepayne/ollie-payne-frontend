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
  return (
    <article
      className={className}
      sx={{
        position: "relative",
        bg: "myLightGray",
        boxShadow: "0 0px 10px rgb(0 0 0 / 0.25)",
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
          p: 3,
          display: "inline-block",
          verticalAlign: "top"
        }}
      >
        <Link
          href={`/blog/${blogPost.slug}`}
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
