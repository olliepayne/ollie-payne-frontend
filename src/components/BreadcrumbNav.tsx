/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useRouter } from "next/router"
import { Text } from "theme-ui"

const BreadcrumbNav = () => {
  // Get the current path and split each folder + current slug into an array
  const { asPath } = useRouter()
  let splitPath = asPath.split("/")
  splitPath.splice(0, 1)
  console.log(splitPath)
  const slug = splitPath[splitPath.length - 1]

  // Check if the slug has any "-", split and rejoin
  const parseSlug = () => {
    if (slug.includes("-")) {
      const splitSlug = slug.split("-")
      splitPath[splitPath.length - 1] = splitSlug.join(" ")
    }
  }
  parseSlug()

  // Turn the current pathLink from our .map() into camel case
  type PathLinkToTitleCase = (pathLink: string) => string
  const pathLinkToTitleCase: PathLinkToTitleCase = (pathLink: string) => {
    let newPathLink: string

    if (pathLink.includes(" ")) {
      const splitPathLink = pathLink.split(" ")
      newPathLink = splitPathLink
        .map(
          (str) => `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`
        )
        .join(" ")
    } else {
      newPathLink = `${pathLink.charAt(0).toUpperCase()}${pathLink.slice(
        1,
        pathLink.length
      )}`
    }

    return newPathLink
  }

  return (
    <ul
      sx={{
        listStyle: "none",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 0,
        li: {
          fontFamily: "body",
          a: {
            color: "black",
            transition: "all 0.2s ease-out",
            ":hover": {
              color: "gray"
            }
          }
        }
      }}
    >
      <li>
        <Link href="/">Home</Link>
      </li>
      {splitPath.map((pathLink, index) => (
        <li key={pathLink + index}>
          <Text
            sx={{
              mx: 2,
              userSelect: "none"
            }}
          >
            /
          </Text>
          {index < splitPath.length - 1 ? (
            <Link href={`/${pathLink}`}>{pathLinkToTitleCase(pathLink)}</Link>
          ) : (
            <Text
              sx={{
                fontWeight: 700,
                userSelect: "none"
              }}
            >
              {pathLinkToTitleCase(pathLink)}
            </Text>
          )}
        </li>
      ))}
    </ul>
  )
}

export default BreadcrumbNav
