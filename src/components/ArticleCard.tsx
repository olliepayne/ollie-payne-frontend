/** @jsxImportSource theme-ui */

// Packages
import Link from "next/link"
import Image from "next/image"
import { Box, Heading, Paragraph, Text } from "theme-ui"

// My components
import ArrowSVG from "components/svgs/ArrowSVG"

// Helpers
import { BlogPost } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"

type ArticleCard = {
  className?: string
  blogPost: BlogPost
}

const ArticleCard = ({ className, blogPost }: ArticleCard) => {
  // - parse and store datePublished
  const parsedDatePublished = parsedKebabDate(
    blogPost.attributes.datePublished,
    "FULL"
  )
  const formattedDatePublished = `${parsedDatePublished.month} ${parsedDatePublished.day}, ${parsedDatePublished.year}`

  return (
    <article
      className={className}
      sx={{
        height: ["350px", "500px"],
        position: "relative",
        bg: "myLightGray",
        boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
        ":hover": {
          cursor: "pointer"
        }
      }}
    >
      {/* Thumbnail */}
      <Box
        className="thumbnail-container"
        sx={{
          position: "relative",
          height: ["40%"],
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

      {/* Content */}
      <Box
        className="content"
        sx={{
          p: 3,
          verticalAlign: "top"
        }}
      >
        <Heading className="article-title" as="h4" variant="styles.h4">
          {blogPost.attributes.h1}
        </Heading>
        <Text
          sx={{
            color: "dateGray",
            mr: 3
          }}
        >
          <time dateTime={blogPost.attributes.datePublished}>
            {formattedDatePublished}
          </time>
        </Text>
        <Paragraph
          sx={{
            my: 3
          }}
        >
          Snippet
        </Paragraph>
        <Link
          href={`/blog/${blogPost.attributes.slug}`}
          sx={{
            variant: "links.primary",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            transition: "all 0.2s ease-out",
            ":hover": {
              color: "gray"
            },
            "::after": {
              content: `""`,
              inset: 0,
              position: "absolute"
            }
          }}
        >
          Read More
          <ArrowSVG
            className="icon"
            sx={{
              width: "30px",
              height: "30px",
              ml: 2
            }}
          />
        </Link>
      </Box>
    </article>
  )
}

export default ArticleCard
