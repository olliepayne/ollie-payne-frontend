/** @jsxImportSource theme-ui */
import Link from "next/link"
import { useRouter } from "next/router"

const BreadcrumbNav = () => {
  const { pathname } = useRouter()
  console.log(pathname)

  return (
    <ul
      sx={{
        listStyle: "none",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <li>
        <Link href="#"></Link>
      </li>
    </ul>
  )
}

export default BreadcrumbNav
