/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container, Box, Flex } from "theme-ui"
import MenuButton from "./MenuButton"

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY !== 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    })
  }, [])

  const [navIsOpen, setNavIsOpen] = useState(false)
  const openNav = () => {
    const newState = !navIsOpen
    setNavIsOpen(newState)
    document.body.style.overflow = newState ? "hidden" : "auto"
  }

  return (
    <>
      <header
        sx={{
          // height: hasScrolled ? "80px" : "60px",
          position: "sticky",
          top: 0,
          // display: [navIsOpen ? "block" : "none", "block"],
          transition: "all 0.2s ease-out",
          transitionDelay: "0.05s",
          borderWidth: "0 0 4px 0",
          borderStyle: "solid",
          borderColor: "subtlePink",
          backgroundColor: "rgb(255 255 255 / 60%)",
          backdropFilter: "blur(5px)",
          a: {
            textDecoration: "none"
          },
          
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
                  display: ["inline-block", "none"],
                  position: "relative",
                  zIndex: 999
                }}
              />
            </Flex>
            <ul
              sx={{
                p: 0,
                listStyleType: "none",
                display: "flex",
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
      {/* <Box
        sx={{
          width: "70px",
          height: "70px",
          display: ["block", "none"],
          position: "fixed",
          bottom: -3,
          right: -3,
          borderRadius: "50%",
          backgroundColor: "subtlePink",
          transition: "all 0.2s ease-in"
        }}
      /> */}
    </>
  )
}

export default Header
