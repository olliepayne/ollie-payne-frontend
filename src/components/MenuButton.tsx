/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui"
import { useState } from "react"

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
    borderRadius: "4px",
    transform: "none",
    transition: "all 0.2s ease-in"
  }
}

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

  return (
    <button
      className={className}
      sx={{
        ...buttonStyles,
        ".top": {
          transform: toggled ? "translateY(9px) rotateZ(45deg)" : "none"
        },
        ".middle": {
          transform: toggled ? "translateY(32px) rotateZ(45deg)" : "none"
        },
        ".bottom": {
          transform: toggled ? "translateY(-9px) rotateZ(-45deg)" : "none"
        }
      }}
      onClick={handleClick}
    >
      <span className="top" />
      <span className="middle" />
      <span className="bottom" />
    </button>
  )
}

export default MenuButton
