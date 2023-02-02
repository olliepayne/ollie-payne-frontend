/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import Link from "next/link"
import { Container } from "theme-ui"

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

  return (
    <header
      sx={{
        height: hasScrolled ? "80px" : "60px",
        position: "sticky",
        top: 0,
        backgroundColor: "#F8F8F8",
        boxShadow: "0px 0px 8px rgb(0 0 0 / 20%)",
        transition: "all 0.2s ease-out",
        transitionDelay: "0.05s",
        px: 3
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Link href="/">Ollie</Link>
          <ul
            sx={{
              // flex: "1",
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-between",
              li: {
                mx: 8
              }
            }}
          >
            <li>
              <Link href="#about-me">About me</Link>
            </li>
            <li>
              <Link href="#my-work">My Work</Link>
            </li>
            <li>
              <Link href="#reach-out"></Link>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
