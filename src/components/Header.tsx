/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container, Box } from "theme-ui"
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
      {/* <header
        sx={{
          width: ["100%", "unset"],
          m: [0, 3],
          height: ["100%", hasScrolled ? "80px" : "60px"],
          position: ["fixed", "sticky"],
          top: [0, 3],
          left: 0,
          display: [navIsOpen ? "block" : "none", "block"],
          // backgroundColor: [
          //   navIsOpen ? "rgb(0 0 0 / 10%)" : "transparent",
          //   hasScrolled ? "rgb(0 0 0 / 5%)" : "transparent"
          // ],
          backgroundColor: "subtlePink",
          transition: "all 0.2s ease-out",
          transitionDelay: "0.05s",
          borderRadius: "8px",
          a: {
            textDecoration: "none"
          }
        }}
      >
        <Container
          sx={{
            height: ["unset", "100%"]
          }}
        >
          <nav
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: ["column", "row"],
              justifyContent: "space-between",
              alignItems: ["flex-start", "center"]
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
            <ul
              sx={{
                p: 0,
                listStyleType: "none",
                display: "flex",
                flexDirection: ["column", "row"],
                justifyContent: "space-between",
                alignItems: ["flex-start", "center"],
                li: {
                  mx: 3,
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
      </header> */}
      <Box
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
      />
      <MenuButton
        callback={openNav}
        sx={{
          m: "0 auto",
          display: ["inline-block", "none"],
          position: "fixed",
          zIndex: 999,
          bottom: 2,
          right: 2
        }}
      />
    </>
  )
}

export default Header
