/** @jsxImportSource theme-ui */
import { Text, Container } from "theme-ui"

const Footer = () => {
  const thisYear = () => {
    const date = new Date()
    return date.getFullYear()
  }

  return (
    <footer
      sx={{
        py: 4
      }}
    >
      <Container>
        <Text
          sx={{
            fontSize: 0
          }}
        >
          Copyright &copy; Oliver Payne {thisYear()}
        </Text>
      </Container>
    </footer>
  )
}

export default Footer
