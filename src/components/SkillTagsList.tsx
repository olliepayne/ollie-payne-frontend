/** @jsxImportSource theme-ui */

// Packages
import Link from "next/link"
import { useRouter } from "next/router"
import { Box, Text } from "theme-ui"

// Helpers
import { SkillTag } from "helpers/myTypes"

type Props = {
  className?: string
  skillTags: SkillTag[]
}

const SkillTagsList = ({ className, skillTags }: Props) => {
  const { asPath } = useRouter()

  type CreateSkillQuery = (skillTagId: number) => string
  const createSkillQuery: CreateSkillQuery = (skillTagId) => {
    const query = `/portfolio?skill=${skillTagId}`
    if (asPath.includes(query)) {
      return "/portfolio"
    } else {
      return query
    }
  }

  // For styling, get the show which skill tag is currently selected with alternate styling
  const skillTagIsActive = (skillTagId: number) => {
    const queryTargetSkillTagId = `?skill=${skillTagId}`
    if (asPath.includes(queryTargetSkillTagId)) {
      return true
    } else {
      return false
    }
  }

  return (
    <Box className={className}>
      <Text
        sx={{
          mr: 2,
          fontWeight: 500
        }}
      >
        Skills:
      </Text>
      <ul
        sx={{
          my: 0,
          listStyle: "none",
          pl: 0,
          py: 3,
          display: "inline-flex",
          overflow: "scroll",
          li: {
            flex: "0 0 fit-content"
          },
          "> li:not(:last-child)": {
            mr: 2
          }
        }}
      >
        {skillTags.map((skillTag, index) => (
          <li key={`skillTags:${index}`}>
            <Link
              scroll={false}
              href={`${createSkillQuery(skillTag.id)}`}
              sx={{
                variant: "links.tag",
                borderColor: skillTagIsActive(skillTag.id) ? "myPink" : "black",
                backgroundColor: skillTagIsActive(skillTag.id)
                  ? "myPink"
                  : "transparent"
              }}
            >
              {skillTag.attributes.name}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default SkillTagsList
