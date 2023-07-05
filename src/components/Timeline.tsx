/** @jsxImportSource theme-ui */

// Packages
import Image from "next/image"
import { Box, Flex, Heading, Paragraph, Text } from "theme-ui"

// My components
import SkillTagsList from "components/SkillTagsList"

// Helpers
import { TimelineEvent, TimelineEvents } from "helpers/myTypes"
import { parsedKebabDate } from "helpers/dateParser"
import { getStrapiUrl } from "helpers/api"

type Props = {
  events: TimelineEvents
}

const Timeline = ({ events }: Props) => {
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

  const getDuration = (eventStartDateStr: string, eventEndDateStr?: string) => {
    const eventStartDate = new Date(eventStartDateStr)
    const monthsDiff = eventEndDateStr
      ? new Date(eventEndDateStr).getMonth() -
        1 -
        (eventStartDate.getMonth() - 1)
      : new Date().getMonth() - eventStartDate.getMonth() - 1
    const yearDiff = eventEndDateStr
      ? new Date(eventEndDateStr).getFullYear() - eventStartDate.getFullYear()
      : new Date().getFullYear() - eventStartDate.getFullYear()

    const duration =
      (yearDiff > 0 ? `${yearDiff} year${yearDiff > 1 ? "s" : ""} ` : "") +
      (monthsDiff > 0 ? `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}` : "")
    return duration
  }

  return (
    <Box className="timeline">
      {events.data.map((event, index) => (
        <Flex
          key={event.id + event.attributes.occupationTitle}
          className="event"
          sx={{
            pt: !isSameInstitution(event, index) ? 4 : 2,
            pl: 2,
            justifyContent: "start"
          }}
        >
          <Flex
            sx={{
              flex: "0 0 50px",
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
                placeholder="blur"
                blurDataURL={`${getStrapiUrl()}${
                  event.attributes.cover.data.attributes.url
                }`}
                width={50}
                height={50}
                sx={{
                  mb: 3,
                  objectFit: "contain",
                  bg: "myLightGray"
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
            {/* Institution name */}
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
                    mb: 0,
                    mr: 3
                  }}
                >
                  {event.attributes.institutionName}
                </Heading>
              </Box>
            )}

            {/* Occupation title */}
            <Heading
              as="h4"
              variant="styles.h4"
              sx={{
                mt: 0
              }}
            >
              {event.attributes.occupationTitle}
            </Heading>

            {/* Commitment */}
            <Text
              sx={{
                fontWeight: 500
              }}
            >
              {event.attributes.commitment}
            </Text>

            {/* Start date (and end date or present) */}
            <Box
              sx={{
                mt: 2,
                fontFamily: "body",
                color: "#5c5c5c"
              }}
            >
              <Text>
                <time dateTime={event.attributes.startDate}>
                  {parsedKebabDate(event.attributes.startDate, "SHORT").month}{" "}
                  {parsedKebabDate(event.attributes.startDate, "SHORT").year} -
                </time>
                <time dateTime={event.attributes.endDate}>
                  {event.attributes.currentlyHere ? (
                    <>{" Present"}</>
                  ) : (
                    <>
                      {" "}
                      {
                        parsedKebabDate(event.attributes.endDate, "SHORT").month
                      }{" "}
                      {parsedKebabDate(event.attributes.endDate, "SHORT").year}
                    </>
                  )}
                </time>
              </Text>
              <Text
                sx={{
                  mx: 2
                }}
              >
                &bull;
              </Text>
              <Text>
                {getDuration(
                  event.attributes.startDate,
                  event.attributes.endDate
                )}
              </Text>
            </Box>
            <Text
              sx={{
                mt: 2,
                display: "block",
                fontFamily: "body",
                color: "#5c5c5c"
              }}
            >
              {event.attributes.location}
            </Text>

            {/* Description */}
            <Paragraph
              sx={{
                my: 2
              }}
            >
              {event.attributes.description}
            </Paragraph>

            {event.attributes.skillTags && (
              <SkillTagsList skillTags={event.attributes.skillTags.data} />
            )}
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Timeline
