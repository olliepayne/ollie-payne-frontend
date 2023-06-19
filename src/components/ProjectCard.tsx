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
        bg: "subtlePink",
        boxShadow: "0 0 8px rgb(0 0 0 / 0.1)"
      }}
    >
      {/* Image */}
      <Box
        sx={{
          display: "inline-block",
          height: "100%",
          flex: "1 0 50%",
          position: "relative"
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
        <Flex
          sx={{
            my: 3,
            alignItems: "center"
          }}
        >
          <Text
            sx={{
              color: "dateGray",
              mr: 3
            }}
          >
            <time dateTime={project.attributes.datePublished}>
              {formattedDatePublished}
            </time>
          </Text>

          {/* Tags */}
          <Text
            sx={{
              mr: 1,
              fontWeight: 500
            }}
          >
            Skills:
          </Text>
          {project.attributes.skillTags && (
            <ul
              sx={{
                display: "inline-flex",
                p: 0,
                listStyle: "none",
                "li:not(:last-child)": {
                  // mr: 2
                }
              }}
            >
              {project.attributes.skillTags?.data.map((skillTag, index) => (
                <li key={`project${project.id}:skillTag:${skillTag.id}`}>
                  <Text
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    {index > 0 && ", "}
                    {skillTag.attributes.name}
                  </Text>
                </li>
              ))}
            </ul>
          )}
        </Flex>

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
