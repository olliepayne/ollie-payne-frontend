/** @jsxImportSource theme-ui */

// Packages
import Image from "next/image"
import Link from "next/link"
import { Box, Heading, Paragraph, Text } from "theme-ui"

// Helpers
import { Project } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { getStrapiUrl } from "helpers/api"

type Props = {
  project: Project
  flipped?: boolean
}

const OldProjectCard = ({ project, flipped }: Props) => {
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
    <Box
      sx={{
        height: ["400px", "250px"],
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
          flex: "0 0 40%",
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
          py: [2, 3],
          px: [3, 4]
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
    </Box>
  )
}

export default OldProjectCard
