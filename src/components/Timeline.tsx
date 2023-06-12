/** @jsxImportSource theme-ui */
import { TimelineEvent, TimelineEventData } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"

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
        <Flex
          key={index}
          className="event"
          sx={{
            pt: 2,
            justifyContent: "start"
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center"
            }}
          >
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
            <Heading
              as="h3"
              variant="styles.h3"
              sx={{
                mt: 0
              }}
            >
              {!isSameInstitution(event, index) &&
                event.attributes.institutionName}
            </Heading>
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
                display: "block",
                fontFamily: "body"
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
      ))}
    </Box>
  )
}

export default Timeline
