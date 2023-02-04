/** @jsxImportSource theme-ui */
import { useState } from "react"
import { ThemeUICSSObject } from "theme-ui"

interface IMenuButton {
  callback: () => void
  className?: string
}

const MenuButton = ({ callback, className }: IMenuButton) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    // setIsActive(!isActive)
    callback()
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
      // transform: isActive ? "translateY(9px) rotateZ(45deg)" : "none"
    },
    ".middle": {
      transform: isActive ? "translateY(32px) rotateZ(45deg)" : "none"
    },
    ".bottom": {
      transform: isActive ? "translateY(-9px) rotateZ(-45deg)" : "none"
    },
    ".fake-checkbox:checked ~ .top": {
      transform: "translateY(9px) rotateZ(45deg)"
    }
  }

  return (
    <button className={className} sx={buttonStyles} onClick={handleClick}>
      <input
        type="checkbox"
        className="fake-checkbox"
        sx={{
          m: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          visibility: "hidden"
        }}
      />
      <span className="top" />
      <span className="middle" />
      <span className="bottom" />
    </button>
  )
}

export default MenuButton
