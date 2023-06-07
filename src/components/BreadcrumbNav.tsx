/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useRouter } from "next/router"
import { Text } from "theme-ui"

const BreadcrumbNav = () => {
  const { asPath } = useRouter()
  let pathSplit = asPath.split("/")
  pathSplit = pathSplit.splice(1, pathSplit.length)
  // console.log(pathSplit)

  const pathLinkToCamelCase = (pathLink: string) =>
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
            textDecoration: "none",
            color: "black",
            ":hover": {
              textDecoration: "underline"
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
              mx: 2
            }}
          >
            /
          </Text>
          {index < pathSplit.length - 1 ? (
            <Link href={`/${pathLink}`}>{pathLinkToCamelCase(pathLink)}</Link>
          ) : (
            <Text
              sx={{
                fontWeight: 700
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
