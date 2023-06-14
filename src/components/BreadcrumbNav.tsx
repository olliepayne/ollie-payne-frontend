/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useRouter } from "next/router"
import { Text } from "theme-ui"

const BreadcrumbNav = () => {
  // Get the current path and split each folder + current slug into an array
  const { asPath } = useRouter()
  let pathSplit = asPath.split("/")
  pathSplit = pathSplit.splice(1, pathSplit.length)

  // Check if the slug has any "-", split and rejoin
  const parseSlug = () => {
    const slug = pathSplit[pathSplit.length - 1]
    if (slug.includes("-")) {
      const slugSplit = slug.split("-")
      pathSplit[pathSplit.length - 1] = slugSplit.join(" ")
    }
  }
  parseSlug()

  // Turn the current pathLink from our .map() into camel case
  type PathLinkToCamelCase = (pathLink: string) => string
  const pathLinkToCamelCase: PathLinkToCamelCase = (pathLink: string) =>
    `${pathLink.charAt(0).toUpperCase()}${pathLink.slice(1, pathLink.length)}`

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
      {pathSplit.map((pathLink, index) => (
        <li key={pathLink + index}>
          <Text
            sx={{
              mx: 2,
              userSelect: "none"
            }}
          >
            /
          </Text>
          {index < pathSplit.length - 1 ? (
            <Link href={`/${pathLink}`}>{pathLinkToCamelCase(pathLink)}</Link>
          ) : (
            <Text
              sx={{
                fontWeight: 700,
                userSelect: "none"
              }}
            >
              {pathLinkToCamelCase(pathLink)}
            </Text>
          )}
        </li>
      ))}
    </ul>
  )
}

export default BreadcrumbNav
