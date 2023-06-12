/** @jsxImportSource theme-ui */
import { TimelineEvent, TimelineEventData } from "helpers/myTypes"
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"

// Props
type Timeline = {
  events: TimelineEventData[]
}

const Timeline = ({ events }: Timeline) => {
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
              {event.attributes.institutionName}
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
              {/* <time>
                {startDate?.month} {startDate?.year} -
              </time>
              {event.endDate ? (
                <time>
                  {" "}
                  {event.endDate.month} {event.endDate.year}
                </time>
              ) : (
                " Present"
              )} */}
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
