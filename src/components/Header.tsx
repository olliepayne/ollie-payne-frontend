/** @jsxImportSource theme-ui */
import { useState } from "react"
import Link from "next/link"
import { Container, Box, Flex, ThemeUICSSObject } from "theme-ui"
import MenuButton from "./MenuButton"

const headerStyles: ThemeUICSSObject = {
  position: "sticky",
  top: 0,
  transition: "all 0.2s ease-out",
  transitionDelay: "0.05s",
  borderWidth: "0 0 2px 0",
  borderStyle: "solid",
  borderColor: "subtlePink",
  backgroundColor: "rgb(255 255 255 / 80%)",
  backdropFilter: "blur(5px)",
  // boxShadow: "0px -4px 8px rgb(0 0 0 / 0.25)",
  a: {
    textDecoration: "none"
  },
  zIndex: 10
}

const Header = () => {
  const navStyles: ThemeUICSSObject = {
    display: "flex",
    flexDirection: ["column", "row"],
    justifyContent: "space-between",
    alignItems: ["flex-start", "center"],
    transition: "all 0.1s ease-out"
  }

  // Review: does this need to come back?
  // const closeNavOnResize = () => {
  //   if (screen.width > 768) setNavIsOpen(false)
  // }

  const [navIsOpen, setNavIsOpen] = useState(false)
  const openNav = () => {
    const newState = !navIsOpen
    setNavIsOpen(newState)
  }

  return (
    <header sx={headerStyles}>
      <Container>
        <nav
          sx={{
            ...navStyles,
            py: 2
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
            <li>
              <Link
                href="/contact"
                sx={{
                  py: 2,
                  px: 3,
                  mt: [1, 0],
                  display: "inline-block",
                  // variant: "links.underlineLeftToRight",
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
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
