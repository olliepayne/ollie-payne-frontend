/** @jsxImportSource theme-ui */
import { Box, Heading } from "theme-ui"

interface ITimeline {
  events?: [
    {
      title: string
      institutionName: string
      dateStarted: string
      dateEnded?: string
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

          </Heading>
        </Box>
      ))}
    </Box>
  )
}

export default Timeline
