import type { Theme } from "theme-ui"

export const theme: Theme = {
  fonts: {
    heading: "",
    body: ""
  },
  colors: {},
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
      magin: "0 auto",
      px: 3
    },
    narrow: {
      maxWidth: 800,
      magin: "0 auto",
      px: 3
    }
  },
  fontSizes: [],
  breakpoints: []
}
