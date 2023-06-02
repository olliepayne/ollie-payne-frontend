/** @jsxImportSource theme-ui */
import { ThemeProvider } from "theme-ui"
import type { AppProps } from "next/app"
import { theme } from "theme"
import "../../public/global.css"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
