/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container, Box, Flex, ThemeUICSSObject } from "theme-ui"
import MenuButton from "./MenuButton"
import debounce from "helpers/debounce"

const headerStyles: ThemeUICSSObject = {
  position: "sticky",
  top: 0,
  transition: "all 0.2s ease-out",
  transitionDelay: "0.05s",
  borderWidth: "0 0 4px 0",
  borderStyle: "solid",
  borderColor: "subtlePink",
  backgroundColor: "rgb(255 255 255 / 80%)",
  backdropFilter: "blur(5px)",
  a: {
    textDecoration: "none"
  }
}

const Header = () => {
  const navStyles: ThemeUICSSObject = {
    display: "flex",
    flexDirection: ["column", "row"],
    justifyContent: "space-between",
    alignItems: ["flex-start", "center"],
    transition: "all 0.1s ease-out"
  }

  const [hasScrolled, setHasScrolled] = useState(false)
  const checkScroll = () => {
    if (window.scrollY !== 0) return setHasScrolled(true)
    setHasScrolled(false)
  }

  // - dead for now
  // const closeNavOnResize = () => {
  //   if (screen.width > 768) setNavIsOpen(false)
  // }

  useEffect(() => {
    document.addEventListener("scroll", debounce(checkScroll, 10))
    // document.addEventListener("resize", debounce(closeNavOnResize, 10)) - dead for now
  }, [])

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
            // py: hasScrolled ? 1 : 0 - mute for now
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
                color: "black",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 999
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
              justifyContent: "space-between",
              alignItems: ["flex-start", "center"],
              li: {
                mx: [0, 3],
                my: [2, 0]
              }
            }}
          >
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
                href="#"
                sx={{
                  variant: "links.underlineLeftToRight",
                  fontSize: 1
                }}
              >
                Timeline
              </Link>
            </li>
            <li>
              <Link
                href="#"
                sx={{
                  variant: "links.underlineLeftToRight",
                  fontSize: 1
                }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
