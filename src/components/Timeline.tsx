/** @jsxImportSource theme-ui */
import { Box, Heading } from "theme-ui"
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
          <Heading as="h3" variant="styles.h3">
            {event.title}
          </Heading>
        </Box>
      ))}
    </Box>
  )
}

export default Timeline
