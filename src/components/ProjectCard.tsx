/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph, Text, Flex } from "theme-ui"
import Image from "next/image"
import Link from "next/link"
import { Project } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { getStrapiUrl } from "helpers/api"

// Props
type ProjectCard = {
  project: Project
  flipped?: boolean
}

const ProjectCard = ({ project, flipped }: ProjectCard) => {
  // - parse and store datePublished
  const parsedDatePublished = parsedKebabDate(
    project.attributes.datePublished,
    "FULL"
  )
  const formattedDatePublished = `${parsedDatePublished.month} ${parsedDatePublished.day}, ${parsedDatePublished.year}`

  return (
    <Box
      sx={{
        height: ["600px", "300px"],
        display: "flex",
        flexDirection: ["column", flipped ? "row-reverse" : "row"],
        justifyContent: "space-between",
        position: "relative",
        bg: "subtlePink"
      }}
    >
      {/* Image */}
      <Box
        sx={{
          display: "inline-block",
          height: "100%",
          flex: "1 0 50%",
          position: "relative"
          // borderStyle: "solid",
          // borderWidth: "2px",
          // borderColor: "black"
        }}
      >
        <Image
          src={`${getStrapiUrl()}${
            project.attributes.hero?.data.attributes.url
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
          {project.attributes.name}
        </Heading>

        {/* Date published & tags */}
        <Box
          sx={{
            my: 3
          }}
        >
          <Text
            sx={{
              color: "dateGray"
            }}
          >
            <time dateTime={project.attributes.datePublished}>
              {formattedDatePublished}
            </time>
          </Text>

          {/* Bullet divider (between tags) */}
          {project.attributes.projectTags && (
            <Text
              sx={{
                mx: 2,
                userSelect: "none"
              }}
            >
              &bull;
            </Text>
          )}

          {/* Tags */}
          <ul
            sx={{
              display: "inline-flex",
              p: 0,
              listStyle: "none"
            }}
          >
            {project.attributes.projectTags?.data.map((projectTag, index) => (
              <li key={projectTag.attributes.name}>
                <Text
                  sx={{
                    fontStyle: "italic"
                  }}
                >
                  {index > 0 && ", "} {projectTag.attributes.name}
                </Text>
              </li>
            ))}
          </ul>
        </Box>

        {/* Snippet */}
        <Paragraph
          sx={{
            my: 3
          }}
        >
          {project.attributes.snippet}
        </Paragraph>

        {/* Links */}
        <Box>
          <Link
            href={`/portfolio/${project.attributes.slug}`}
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
          {project.attributes.liveUrl && (
            <a
              href={project.attributes.liveUrl}
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
