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
    setIsActive(!isActive)
    callback()
  }

  const buttonStyles: ThemeUICSSObject = {
    border: "none",
    p: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    width: "32px",
    ".top, .middle, .bottom": {
      height: "4px",
      m: "5px 0",
      width: "100%",
      display: "block",
      backgroundColor: "black",
      transition: "all 0.1s ease-in",
      borderRadius: "4px"
    },
    ".top": {
      transform: isActive ? "translateY(9px) rotateZ(45deg)" : "none"
    },
    ".middle": {
      opacity: isActive ? 0 : 1
    },
    ".bottom": {
      transform: isActive ? "translateY(-9px) rotateZ(-45deg)" : "none"
    }
  }

  const activeStyles: ThemeUICSSObject = {
    ...buttonStyles
  }

  return (
    <button
      className={className}
      sx={() => (isActive ? activeStyles : buttonStyles)}
      onClick={handleClick}
    >
      <span className="top" />
      <span className="middle" />
      <span className="bottom" />
    </button>
  )
}

export default MenuButton
