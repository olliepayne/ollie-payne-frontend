/** @jsxImportSource theme-ui */
import { TimelineEventData } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"
import Image from "next/image"
import { getStrapiUrl } from "helpers/api"

// Props
type Timeline = {
  events: TimelineEventData[]
}

const Timeline = ({ events }: Timeline) => {
  type IsSameInstituion = (event: TimelineEventData, index: number) => boolean
  const isSameInstitution: IsSameInstituion = (event, index) => {
    if (
      index > 0 &&
      events[index - 1].attributes.institutionName !==
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
      {events?.map((event, index) => (
        // - display the institution name and logo
        <>
          <Flex
            key={index}
            className="event"
            sx={{
              pt: 2,
              pl: 2,
              justifyContent: "start"
            }}
          >
            <Flex
              sx={{
                width: "50px",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {!isSameInstitution(event, index) && (
                <Image
                  src={`${getStrapiUrl()}${
                    event.attributes.cover.data.attributes.url
                  }`}
                  alt=""
                  width={50}
                  height={50}
                  sx={{
                    mb: 3
                  }}
                />
              )}
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
            <Box
              sx={{
                ml: 4,
                mb: 3,
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
                  // mt: !isSameInstitution(event, index) ? 4 : 0
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
                  mt: 2
                }}
              >
                {event.attributes.description}
              </Paragraph>
            </Box>
          </Flex>
        </>
      ))}
    </Box>
  )
}

export default Timeline
