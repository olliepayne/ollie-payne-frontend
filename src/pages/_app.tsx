/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui"
import type { AppProps } from 'next/app'
import { theme } from "theme"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
