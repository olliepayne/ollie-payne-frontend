/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Paragraph } from "theme-ui"
import { timelineEvents } from "../../public/testData.json"

interface ITimeline {
  events?: [
    {
      title: string
      institutionName: string
      startDate: {
        month: string
        year: number
      }
      // endDate?: {
      //   month: string
      //   year: number
      // }
      description: string
    }
  ]
}

const Timeline = ({ events }: ITimeline) => {
  return (
    <Box className="timeline">
      {events?.map((event, index) => (
        <Flex
          key={index}
          className="event"
          sx={{
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
                width: "10px",
                height: "10px",
                backgroundColor: "myGray",
                display: "block",
                borderRadius: "50%"
              }}
            />
            <span
              sx={{
                width: "3px",
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
              {event.title}
            </Heading>
            <Paragraph>{event.description}</Paragraph>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Timeline
