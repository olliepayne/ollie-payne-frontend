/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"

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
        display: "flex",
        boxShadow: "0px 0px 8px rgb(0 0 0 / 20%)",
        transition: "all 0.2s ease-out",
        transitionDelay: "0.05s"
      }}
    >
      <nav>
        <ul
          sx={{
            listStyleType: "none"
          }}
        >
          <li></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
