/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container } from "theme-ui"
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

  const openNav = () => {}

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
        backdropFilter: "blur(6px)",
        a: {
          textDecoration: "none"
        }
      }}
    >
      <Container
        sx={{
          height: "100%"
        }}
      >
        <nav
          sx={{
            height: "100%",
            display: ["none", "flex"],
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
          <ul
            sx={{
              p: 0,
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              li: {
                mx: 3
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
              <Link href="/">Home</Link>
            </li>
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
        <MenuButton
          callback={openNav}
          sx={{
            display: ["inline-block", "none"]
          }}
        />
      </Container>
    </header>
  )
}

export default Header
