/** @jsxImportSource theme-ui */

// Packages
import { useState } from "react"
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
  pagesToCreate: number
  currentPageNumber: number
}

const PaginationControl = ({ pagesToCreate, currentPageNumber }: Props) => {
  const { asPath } = useRouter()

  // Create an array of page numbers based off of our data
  const createPageNumberArray = () => {
    let array: number[] = []
    for (let i = 0; i < pagesToCreate; i++) {
      array.push(i + 1)
    }

    return array
  }
  const [pageNumberArray] = useState<number[]>(createPageNumberArray())

  // For styling the pagination buttons
  const getActiveStyle = (pageNumber: number) => {
    if (asPath.includes("results")) {
      if (currentPageNumber === pageNumber) {
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
            href={`?results=${currentPageNumber - 1}`}
            sx={{
              ...paginationLinkStyle,
              visibility: currentPageNumber > 1 ? "visible" : "hidden"
            }}
          >
            <span className="background" />
            {"<"}
          </Link>
        </li>
        {pageNumberArray.map((pageNumber) => (
          <li key={`paginationLinks:${pageNumber}`}>
            <Link href={`?results=${pageNumber}`} sx={paginationLinkStyle}>
              <span
                className="background"
                sx={{
                  backgroundColor: getActiveStyle(pageNumber)
                }}
              />
              {pageNumber}
            </Link>
          </li>
        ))}
        {/* Next */}
        <li>
          <Link
            href={`?results=${currentPageNumber + 1}`}
            sx={{
              ...paginationLinkStyle,
              visibility:
                currentPageNumber < pageNumberArray.length
                  ? "visible"
                  : "hidden"
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
