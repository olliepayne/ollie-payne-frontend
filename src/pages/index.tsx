/** @jsxImportSource theme-ui */
import Header from "components/Header"
import SEO from "components/SEO"
import Head from "next/head"
import Footer from "components/Footer"
import { Container, Heading } from "theme-ui"

export default function Home() {
  return (
    <>
      <SEO
        title="Ollie Payne - Digital Marketer"
        metaDescription="Description"
      />
      <Header />
      <main
        sx={{
          minHeight: "1000px"
        }}
      >
        <section>
          <Container>
            <Heading as="h2">About me</Heading>
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
