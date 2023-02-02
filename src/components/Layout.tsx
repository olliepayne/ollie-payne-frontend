import Header from "./Header"
import { ReactNode } from "react"
import Footer from "./Footer"

interface ILayout {
  children?: ReactNode | ReactNode[]
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
