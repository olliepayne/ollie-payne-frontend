/** @jsxImportSource theme-ui */

// Packages
import Image from "next/image"
import Link from "next/link"
import { Box, Heading, Paragraph, Text, Flex } from "theme-ui"

// Helpers
import { Project } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { getStrapiUrl } from "helpers/api"

type Props = {
  project: Project
  flipped?: boolean
}

const ProjectCard = ({ project, flipped }: Props) => {
  // Parse and store datePublished
  const parsedDatePublished = parsedKebabDate(
    project.attributes.datePublished,
    "FULL"
  )
  const formattedDatePublished = `${parsedDatePublished.month} ${parsedDatePublished.day}, ${parsedDatePublished.year}`

  // Sort the skill tags alphabetically (A - Z)
  const sortedSkillTags = project.attributes.skillTags?.data.sort((a, b) => {
    if (a.attributes.name < b.attributes.name) {
      return -1
    }
    if (a.attributes.name > b.attributes.name) {
      return 1
    }
    return 0
  })

  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: ["column", flipped ? "row-reverse" : "row"]
      }}
    >
      <Box
        sx={{
          flex: ["0 0 150px", "0 0 350px"],
          height: ["unset", "350px"],
          width: ["100%", "unset"],
          position: "relative",
          boxShadow: "0 4px 15px rgb(0 0 0 / 0.25)",
          borderRadius: "8px"
        }}
      >
        <Image
          src={`${getStrapiUrl()}${
            project.attributes.hero.data.attributes.url
          }`}
          alt={`${getStrapiUrl()}${
            project.attributes.hero.data.attributes.alternativeText
          }`}
          fill
          sx={{
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          py: 3,
          px: 4,
          flex: "0 1 100%",
          height: ["unset", "300px"],
          width: ["100%", "unset"],
          bg: "subtlePink"
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
          <Box
            sx={{
              mt: 1
            }}
          >
            <Text
              sx={{
                mr: 1,
                fontWeight: 500
              }}
            >
              Skills:
            </Text>
            <ul
              sx={{
                display: "inline-flex",
                p: 0,
                listStyle: "none"
              }}
            >
              {sortedSkillTags?.map((skillTag, index) => (
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
          </Box>
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
              variant: "links.box"
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
    </Flex>
  )
}

export default ProjectCard
