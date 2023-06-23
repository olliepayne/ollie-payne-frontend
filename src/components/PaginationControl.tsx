/** @jsxImportSource theme-ui */

// Packages
import Link from "next/link"
import { useRouter } from "next/router"
import { Flex, ThemeUIStyleObject } from "theme-ui"

// Styles
const paginationLinkStyle: ThemeUIStyleObject = {
  display: "inline-block",
  textDecoration: "none",
  color: "black",
  fontWeight: 500,
  fontFamily: "body",
  position: "relative",
  zIndex: 1,
  fontSize: 2,
  ":hover": {
    "> span": {
      backgroundColor: "myPink"
    }
  },
  ".background": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    zIndex: -1,
    transition: "background-color 0.2s ease-out"
  }
}

type Props = {
  paginationArray: number[]
}

const PaginationControl = ({}: Props) => {
  const { asPath } = useRouter()

  // For styling the pagination buttons
  const getActiveStyle = (pageNumber: number) => {
    if (asPath.includes("results")) {
      if (currentPage === pageNumber) {
        return "subtlePink"
      } else {
        return "transparent"
      }
    } else if (pageNumber === 1) {
      return "subtlePink"
    }
  }

  return (
    <Flex
      sx={{
        justifyContent: "center"
      }}
    >
      <ul
        sx={{
          my: 5,
          display: "inline-flex",
          p: 0,
          listStyle: "none",
          "> li:not(:last-child)": {
            mr: 4
          }
        }}
      >
        {/* Previous */}
        <li>
          <Link
            href={`?results=${currentPage - 1}`}
            sx={{
              ...paginationLinkStyle,
              visibility: currentPage > 1 ? "visible" : "hidden"
            }}
          >
            <span className="background" />
            {"<"}
          </Link>
        </li>
        {paginationArray.map((pageNumber) => (
          <li key={`paginationLinks:${pageNumber}`}>
            <Link href={`?results=${pageNumber}`} sx={paginationLinkStyle}>
              <span
                className="background"
                sx={{
                  backgroundColor: getPaginationActiveState(pageNumber)
                }}
              />
              {pageNumber}
            </Link>
          </li>
        ))}
        {/* Next */}
        <li>
          <Link
            href={`?results=${currentPage + 1}`}
            sx={{
              ...paginationLinkStyle,
              visibility:
                currentPage < paginationArray.length ? "visible" : "hidden"
            }}
          >
            <span className="background" />
            {">"}
          </Link>
        </li>
      </ul>
    </Flex>
  )
}

export default PaginationControl
