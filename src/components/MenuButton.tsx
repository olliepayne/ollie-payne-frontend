/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui"
import { useState } from "react"

interface IMenuButton {
  callback: () => void
  className?: string
}

const MenuButton = ({ callback, className }: IMenuButton) => {
  const [toggled, setToggled] = useState(false)

  const handleClick = () => {
    callback()
    setToggled(!toggled)
  }

  const buttonStyles: ThemeUICSSObject = {
    border: "none",
    p: 0,
    backgroundColor: "transparent",
    display: "inline-block",
    cursor: "pointer",
    position: "relative",
    width: "32px",
    overflow: "hidden",
    ".top, .middle, .bottom": {
      height: "4px",
      m: "5px 0",
      width: "100%",
      display: "block",
      backgroundColor: "black",
      transition: "all 0.2s ease-in",
      borderRadius: "4px",
      transform: "none"
    },
    ".top": {
      transform: toggled ? "translateY(9px) rotateZ(45deg)" : "none"
    },
    ".middle": {
      transform: toggled ? "translateY(32px) rotateZ(45deg)" : "none"
    },
    ".bottom": {
      transform: toggled ? "translateY(-9px) rotateZ(-45deg)" : "none"
    }
  }

  return (
    <button className={className} sx={buttonStyles} onClick={handleClick}>
      <span className="top" />
      <span className="middle" />
      <span className="bottom" />
    </button>
  )
}

export default MenuButton
