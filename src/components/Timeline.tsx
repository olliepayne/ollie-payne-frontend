/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"
import { timelineEvents } from "../../public/testData.json"

interface ITimeline {
  events?: {
    institutionName: string
    title: string
    timeInvestment?: string
    startDate?: {
      month: string
      year: number
    }
    endDate?: {
      month: string
      year: number
    }
    description: string
  }[]
}

const Timeline = ({ events }: ITimeline) => {
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
              {event.institutionName}
            </Heading>
            <Heading
              as="h4"
              variant="styles.h4"
              sx={{
                mt: 0
              }}
            >
              {event.title}
            </Heading>
            <Text
              sx={{
                display: "block",
                fontFamily: "body"
              }}
            >
              <time>
                {event.startDate?.month} {event.startDate?.year} -
              </time>
              {event.endDate ? (
                <time>
                  {" "}
                  {event.endDate.month} {event.endDate.year}
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
              {event.description}
            </Paragraph>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Timeline
