import type { Theme } from "theme-ui"

export const theme: Theme = {
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`
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
  fontSizes: [
    "0.875rem", // 0 - 14px
    "1rem", // 1 - 16px
    "1.5rem", // 2 - 24px
    "2.25rem", // 3 - 36px
    "3.375rem", // 4 - 54px
    "5.063rem" // 5 - 81px
  ],
  breakpoints: ["600px", "768px", "1200px"],
  text: {
    heading: {
      fontWeight: 700
    }
  },
  styles: {
    h1: {},
    h2: {
      variant: "text.heading",
      fontSize: [3, null, 4]
    }
  }
}
