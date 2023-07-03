/** @jsxImportSource theme-ui */

// Packages
import { useState } from "react"
import Link from "next/link"
import { Container, Flex } from "theme-ui"

// My components
import MenuButton from "components/MenuButton"

const Header = () => {
  const [navIsOpen, setNavIsOpen] = useState(false)
  const openNav = () => {
    const newState = !navIsOpen
    setNavIsOpen(newState)
  }

  const [userHasScrolled, setUserHasScrolled] = useState(false)
  if (typeof window !== "undefined") {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setUserHasScrolled(true)
      } else {
        setUserHasScrolled(false)
      }
    })
  }

  return (
    <header
      sx={{
        position: ["sticky", "static"],
        top: 0,
        borderWidth: "0 0 2px 0",
        borderStyle: "solid",
        borderColor: "subtlePink",
        backgroundColor: "white",
        transition: "all 0.3s ease-out",
        a: {
          textDecoration: "none"
        },
        zIndex: 10
      }}
    >
      <Container>
        <nav
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: ["flex-start", "center"],
            transition: "all 0.3s ease-out",
            py: 1
          }}
        >
          <Flex
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Link
              href="/"
              sx={{
                fontSize: [3, 4],
                fontFamily: "heading",
                fontWeight: 700,
                color: "black"
              }}
            >
              Ollie
            </Link>
            <MenuButton
              callback={openNav}
              className="menu-btn"
              sx={{
                display: ["inline-block", "none"]
              }}
            />
          </Flex>
          <ul
            sx={{
              p: 0,
              listStyleType: "none",
              display: [navIsOpen ? "flex" : "none", "flex"],
              // START TEST
              // transform: navIsOpen ? "scaleY(1)" : "scaleY(0)",
              // transformOrigin: "top",
              // END TEST
              transition: "all 0.2s ease-out",
              flexDirection: ["column", "row"],
              justifyContent: "flex-end",
              alignItems: ["flex-start", "center"],
              li: {
                mx: [0, 3],
                my: [2, 0],
                flexShrink: "0"
              }
            }}
          >
            <li>
              <Link
                href="/portfolio"
                sx={{
                  variant: "links.underlineLeftToRight",
                  fontSize: 1
                }}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/experience"
                sx={{
                  variant: "links.underlineLeftToRight",
                  fontSize: 1
                }}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                sx={{
                  variant: "links.underlineLeftToRight",
                  fontSize: 1
                }}
              >
                Blog
              </Link>
            </li>
            {/* Review: future addition */}
            {/* <li>
              <Link
                href="/contact"
                sx={{
                  py: 2,
                  px: 3,
                  mt: [1, 0],
                  display: "inline-block",
                  fontSize: 1,
                  fontFamily: "body",
                  color: "black",
                  backgroundColor: "transparent",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "myPink",
                  transition: "all 0.2s ease-out",
                  ":hover": {
                    backgroundColor: "myPink"
                  }
                }}
              >
                Hire Me
              </Link>
            </li> */}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
