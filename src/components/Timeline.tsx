/** @jsxImportSource theme-ui */
import { TimelineEvent, TimelineEvents } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"
import Image from "next/image"
import { getStrapiUrl } from "helpers/api"
import Link from "next/link"

// Props
type Timeline = {
  events: TimelineEvents
}

const Timeline = ({ events }: Timeline) => {
  type IsSameInstituion = (event: TimelineEvent, index: number) => boolean
  const isSameInstitution: IsSameInstituion = (event, index) => {
    if (
      index > 0 &&
      events.data[index - 1].attributes.institutionName !==
        event.attributes.institutionName
    ) {
      return false
    } else if (index === 0) {
      return false
    }

    return true
  }

  return (
    <Box className="timeline">
      {events.data.map((event, index) => (
        <Flex
          key={event.id + event.attributes.occupationTitle}
          className="event"
          sx={{
            pt: 2,
            pl: 2,
            justifyContent: "start"
          }}
        >
          <Flex
            sx={{
              flex: "1 0 50px",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            {!isSameInstitution(event, index) && (
              <Image
                src={`${getStrapiUrl()}${
                  event.attributes.cover.data.attributes.url
                }`}
                alt={event.attributes.cover.data.attributes.alternativeText}
                width={50}
                height={50}
                sx={{
                  mb: 3
                }}
              />
            )}

            {/* Dot and line (to make the timeline "graphic") */}
            <span
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: "myGray",
                display: "block",
                borderRadius: "50%"
              }}
            />
            <span
              sx={{
                width: "2px",
                flex: "1 auto",
                display: "block",
                backgroundColor: "myGray",
                mt: 2
              }}
            />
          </Flex>

          {/* Content */}
          <Box
            sx={{
              pl: 3,
              pb: 3,
              display: "inline-block"
            }}
          >
            {!isSameInstitution(event, index) && (
              <Box
                sx={{
                  height: "50px",
                  mb: 3
                }}
              >
                <Heading
                  as="h3"
                  variant="styles.h3"
                  sx={{
                    mt: 0,
                    mr: 3
                  }}
                >
                  {event.attributes.institutionName}
                </Heading>
              </Box>
            )}
            <Heading
              as="h4"
              variant="styles.h4"
              sx={{
                mt: 0
              }}
            >
              {event.attributes.occupationTitle}
            </Heading>
            <Text
              sx={{
                fontWeight: 500
              }}
            >
              {event.attributes.commitment}
            </Text>
            <Text
              sx={{
                mt: 2,
                display: "block",
                fontFamily: "body",
                color: "#5c5c5c"
              }}
            >
              <time>
                {parsedKebabDate(event.attributes.startDate, "SHORT").month}{" "}
                {parsedKebabDate(event.attributes.startDate, "SHORT").year} -
              </time>
              {event.attributes.endDate ? (
                <time>
                  {" "}
                  {
                    parsedKebabDate(event.attributes.endDate, "SHORT").month
                  }{" "}
                  {parsedKebabDate(event.attributes.endDate, "SHORT").year}
                </time>
              ) : (
                " Present"
              )}
            </Text>
            <Paragraph
              sx={{
                my: 2
              }}
            >
              {event.attributes.description}
            </Paragraph>

            {/* Project tags / tag links */}
            <Text
              sx={{
                mr: 2,
                // display: "block",
                fontWeight: 500
              }}
            >
              Skills:
            </Text>
            <ul
              sx={{
                display: "inline-flex",
                p: 0,
                listStyle: "none",
                flexWrap: "wrap"
              }}
            >
              {event.attributes.skillTags?.data.map((skillTag) => (
                <li key={event.id + skillTag.attributes.name}>
                  <Link
                    href={`/portfolio/?skills=${skillTag.id}`}
                    sx={{
                      borderRadius: "32px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "body",
                      fontWeight: 500,
                      py: 1,
                      px: 2,
                      ":hover": {
                        borderColor: "myPink"
                      }
                    }}
                  >
                    {skillTag.attributes.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Timeline
