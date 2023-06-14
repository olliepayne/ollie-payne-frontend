/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph } from "theme-ui"
import Image from "next/image"
import Link from "next/link"

// Props
type ProjectCard = {
  flipped?: boolean
}

const ProjectCard = ({ flipped }: ProjectCard) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", flipped ? "row-reverse" : "row"],
        justifyContent: "space-between",
        position: "relative",
        bg: "subtlePink",
        boxShadow: "0px 4px 12px rgb(0 0 0 / 0.1)"
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          display: "inline-block",
          height: ["350px"],
          flex: "1 0 50%",
          position: "relative",
          // mr: [0, flipped ? 0 : 5],
          // ml: [0, flipped ? 5 : 0]
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

      {/* Copy / CTA links */}
      <Box
        sx={{
          flex: "1 1 50%",
          p: 4
        }}
      >
        <Heading
          as="h3"
          variant="styles.h3"
          sx={{
            my: 0
          }}
        >
          Test
        </Heading>
        <Paragraph
          sx={{
            my: 3
          }}
        >
          Lorem Ipsum.
        </Paragraph>
        <Box>
          <Link
            href="/#"
            sx={{
              display: "inline-block",
              px: 3,
              py: 2,
              mr: 4,
              textDecoration: "none",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "black",
              fontFamily: "body",
              color: "black",
              transition: "all 0.2s ease-out",
              ":hover": {
                backgroundColor: "black",
                color: "white"
              }
            }}
          >
            View Case Study
          </Link>

          {/* - this will be optional */}
          <a
            sx={{
              textDecoration: "underline",
              fontFamily: "body",
              color: "black",
              transition: "all 0.2s ease-out",
              cursor: "pointer",
              ":hover": {
                color: "gray"
              }
            }}
          >
            Visit Live Project
          </a>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectCard
