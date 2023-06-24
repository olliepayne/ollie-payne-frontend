/** @jsxImportSource theme-ui */
import { Heading, Paragraph } from "theme-ui"

// Markdown custom component props & custom components
type CustomComponentProps = {
  children: React.ReactNode | React.ReactNode[]
}

export const components: any = {
  p: ({ children }: CustomComponentProps) => (
    <Paragraph variant="styles.p">{children}</Paragraph>
  ),
  h2: ({ children }: CustomComponentProps) => (
    <Heading
      as="h2"
      variant="styles.h2"
      sx={{
        mt: 4
      }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children }: CustomComponentProps) => (
    <Heading as="h3" variant="styles.h3">
      {children}
    </Heading>
  ),
  h4: ({ children }: CustomComponentProps) => (
    <Heading as="h4" variant="styles.h4">
      {children}
    </Heading>
  )
  // a: {

  // }
}
