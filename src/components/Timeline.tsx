/** @jsxImportSource theme-ui */
import { Box, Heading, Paragraph } from "theme-ui"
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
    <Box>
      {events?.map((event, index) => (
        <Box>
          <span
            sx={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: "myGray",
              borderRadius: "50%"
            }}
          />
          <Heading
            as="h3"
            variant="styles.h3"
            sx={{
              mx: 4,
              display: "inline-block",
              verticalAlign: "middle"
            }}
          >
            {event.title}
          </Heading>
          <Box
            sx={{
              mx: "4px",
              px: 4,
              borderLeftColor: "myGray",
              borderLeftStyle: "solid",
              borderLeftWidth: "2px"
            }}
          >
            <Paragraph>{event.description}</Paragraph>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Timeline
