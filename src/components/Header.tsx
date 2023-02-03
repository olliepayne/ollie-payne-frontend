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
    <header
      sx={{
        mx: 3,
        my: 3,
        height: hasScrolled ? "80px" : "60px",
        position: "sticky",
        top: 3,
        backgroundColor: hasScrolled ? "rgb(0 0 0 / 5%)" : "transparent",
        transition: "all 0.2s ease-out",
        transitionDelay: "0.05s",
        borderRadius: "8px",
        a: {
          textDecoration: "none"
        },
        "::before": {
          content: `""`,
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          backdropFilter: "blur(6px)"
        }
      }}
    >
      <Container
        sx={{
          height: "100%",
          mt: 0
        }}
      >
        <nav
          sx={{
            height: "100%",
            display: "flex",
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
            sx={{
              display: ["inline-block", "none"],
              position: "relative",
              zIndex: 999
            }}
          />
          <ul
            sx={{
              width: ["100%", "unset"],
              p: 0,
              listStyleType: "none",
              display: [navIsOpen ? "flex" : "none", "flex"],
              flexDirection: ["column", "row"],
              justifyContent: "space-between",
              alignItems: "center",
              position: ["absolute", "static"],
              top: [5, 0],
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
    </header>
  )
}

export default Header
