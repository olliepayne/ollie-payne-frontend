import type { Theme } from "theme-ui"

export const theme: Theme = {
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`
  },
  colors: {
    myGray: "#3E3E3E",
    dateGray: "#5C5C5C",
    myPink: "#FFCEDA",
    myLightGray: "#F0F0F0",
    bone: "#F1F0E8",
    subtlePink: "#FFF1F5"
  },
  space: [
    "0rem", // 0 - 0px
    "0.25rem", // 1 - 4px
    "0.5rem", // 2 - 8px
    "1rem", // 3 - 16px
    "2rem", // 4 - 32px
    "4rem", // 5 - 64px
    "8rem", // 6 - 128px
    "16rem" // 7 - 256px
  ],
  layout: {
    container: {
      maxWidth: 1200,
      px: 3
    },
    medium: {
      maxWidth: 1000,
      px: 3
    },
    narrow: {
      maxWidth: 800,
      px: 3
    }
  },
  fontSizes: [
    "0.875rem", // 0 - 14px
    "1rem", // 1 - 16px
    "1.125rem", // 2 - 18px
    "1.5rem", // 3 - 24px
    "2.25rem", // 4 - 36px
    "3.375rem" // 5 - 54px
  ],
  breakpoints: ["769px", "1201px"],
  text: {
    default: {
      fontFamily: "body"
    },
    heading: {
      fontWeight: 700
    },
    paragraph: {
      fontFamily: "body",
      lineHeight: 1.5
    }
  },
  links: {
    primary: {
      fontFamily: "body",
      color: "black",
      transition: "all 0.2s ease-out",
      fontWeight: 500,
      ":hover": {
        color: "gray"
      }
    },
    underlineLeftToRight: {
      py: 1,
      fontFamily: "body",
      color: "black",
      position: "relative",
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
    },
    tag: {
      borderRadius: "32px",
      borderStyle: "solid",
      borderWidth: "2px",
      textDecoration: "none",
      color: "black",
      fontFamily: "body",
      fontWeight: 500,
      py: 1,
      px: 2,
      transition: "all 0.2s ease-out",
      ":hover": {
        borderColor: "myPink"
      }
    }
  },
  styles: {
    h1: {
      variant: "text.heading",
      fontSize: [4, 5],
      my: 4
    },
    h2: {
      variant: "text.heading",
      fontSize: [3, 4],
      my: 2
    },
    h3: {
      variant: "text.heading",
      fontSize: [2, 3],
      my: 2
    },
    h4: {
      variant: "text.heading",
      fontSize: [1, 2],
      my: 2
    }
  }
}
