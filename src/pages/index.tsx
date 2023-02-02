/** @jsxImportSource theme-ui */
import Header from "components/Header"
import SEO from "components/SEO"
import Head from "next/head"
import Footer from "components/Footer"
import { Container } from "theme-ui"

export default function Home() {
  return (
    <>
      <Head>
        <SEO
          title="Ollie Payne - Digital Marketer"
          metaDescription="Description"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        sx={{
          minHeight: "1000px"
        }}
      >
        <section>
          <Container>
            <h2>About me</h2>
          </Container>
        </section>
        <section>
          <h2>My Work</h2>
        </section>
        <section>
          <h2>Reach Out</h2>
        </section>
      </main>
      <Footer />
    </>
  )
}
