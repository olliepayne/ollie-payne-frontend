/** @jsxImportSource theme-ui */

// Third-party
import Link from "next/link"
import Image from "next/image"
import { Box, Heading, Paragraph } from "theme-ui"

// Helpers
import { BlogPost } from "helpers/myTypes"

type ArticleCard = {
  className?: string
  blogPost: BlogPost
}

const ArticleCard = ({ className, blogPost }: ArticleCard) => {
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
        className="thumbnail-container"
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
        className="content"
        sx={{
          p: 3,
          display: "inline-block",
          verticalAlign: "top"
        }}
      >
        <Link
          href={`/blog/${blogPost.attributes.slug}`}
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
            {blogPost.attributes.h1}
          </Heading>
        </Link>
        <Paragraph>Snippet</Paragraph>
      </Box>
    </article>
  )
}

export default ArticleCard
