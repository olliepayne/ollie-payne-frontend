/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container, Box, Flex } from "theme-ui"
import MenuButton from "./MenuButton"
import debounce from "helpers/debounce"

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const checkScroll = () => {
    if (window.scrollY !== 0) return setHasScrolled(true)
    setHasScrolled(false)
  }

  const closeNavOnResize = () => {
    if (screen.width > 768) setNavIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("scroll", debounce(checkScroll, 10))
    document.addEventListener("resize", debounce(closeNavOnResize, 10))
  }, [])

  const [navIsOpen, setNavIsOpen] = useState(false)
  const openNav = () => {
    const newState = !navIsOpen
    setNavIsOpen(newState)
  }

  return (
    <header
      sx={{
        position: "sticky",
        top: 0,
        transition: "all 0.2s ease-out",
        transitionDelay: "0.05s",
        borderWidth: "0 0 4px 0",
        borderStyle: "solid",
        borderColor: "subtlePink",
        backgroundColor: "rgb(255 255 255 / 80%)",
        backdropFilter: "blur(6px)",
        a: {
          textDecoration: "none"
        }
      }}
    >
      <Container>
        <nav
          sx={{
            py: hasScrolled ? 1 : 0,
            display: "flex",
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
            alignItems: ["flex-start", "center"],
            transition: "all 0.1s ease-out"
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
            className="links"
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
              },
              a: {
                py: 1,
                fontFamily: "body",
                fontSize: 1,
                color: "black",
                position: "relative",
                textTransform: "uppercase",
                fontWeight: 700,
                "::after": {
                  content: `""`,
                  width: 0,
                  height: "3px",
                  position: "absolute",
                  left: 0,
                  transform: "translateX(-50%)",
                  bottom: 0,
                  bg: "myPink",
                  transition: "all 0.15s ease-in"
                },
                ":hover": {
                  "::after": {
                    width: "100%",
                    left: "50%",
                    transition: "all 0.15s ease-in"
                  }
                }
              }
            }}
          >
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="#">Timeline</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
