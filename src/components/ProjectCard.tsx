/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Text } from "theme-ui"
import Image from "next/image"
import Link from "next/link"
import { ProjectData } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { getStrapiUrl } from "helpers/api"

// Props
type ProjectCard = {
  projectData: ProjectData
  flipped?: boolean
}

const ProjectCard = ({ projectData, flipped }: ProjectCard) => {
  // - parse and store datePublished
  const parsedDatePublished = parsedKebabDate(
    projectData.attributes.datePublished,
    "SHORT"
  )
  const formattedDatePublished = `${parsedDatePublished.month} ${parsedDatePublished.day}, ${parsedDatePublished.year}`

  return (
    <Box
      sx={{
        height: ["650px", "300px"],
        display: "flex",
        flexDirection: ["column", flipped ? "row-reverse" : "row"],
        justifyContent: "space-between",
        position: "relative",
        bg: "subtlePink"
        // boxShadow: "0px 4px 12px rgb(0 0 0 / 0.1)"
      }}
    >
      {/* Image */}
      <Box
        sx={{
          display: "inline-block",
          height: "100%",
          flex: "1 0 50%",
          position: "relative",
          // borderStyle: "solid",
          // borderWidth: "2px",
          // borderColor: "black"
        }}
      >
        <Image
          src={`${getStrapiUrl()}${
            projectData.attributes.hero?.data.attributes.url
          }`}
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
          flex: "1 0 50%",
          p: 4
        }}
      >
        {/* Name */}
        <Heading
          as="h3"
          variant="styles.h3"
          sx={{
            my: 0
          }}
        >
          {projectData.attributes.name}
        </Heading>

        {/* Date published */}
        <Text
          sx={{
            my: 3,
            display: "block",
            color: "dateGray"
          }}
        >
          {formattedDatePublished}
        </Text>

        {/* Snippet */}
        <Paragraph
          sx={{
            my: 3
          }}
        >
          {projectData.attributes.snippet}
        </Paragraph>

        {/* Links */}
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
          {projectData.attributes.liveUrl && (
            <a
              href={projectData.attributes.liveUrl}
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
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectCard
