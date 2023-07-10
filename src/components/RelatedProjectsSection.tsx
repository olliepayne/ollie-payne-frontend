/** @jsxImportSource theme-ui */

// Packages
import { Container, Heading } from "theme-ui"

// My components
import ProjectCard from "components/ProjectCard"

// Helpers
import { Projects } from "helpers/myTypes"

type Props = {
  projects: Projects
}

const RelatedProjectsSection = ({ projects }: Props) => {
  return (
    <section
      sx={{
        py: [4, 5]
      }}
    >
      <Container>
        <Heading
          as="h2"
          variant="styles.h2"
          sx={{
            mb: 4
          }}
        >
          Related Projects
        </Heading>
        <ul
          sx={{
            p: 0,
            listStyle: "none",
            "> li:not(:last-child)": {
              mb: 5
            }
          }}
        >
          {/* Map projects here */}
          {projects.data.map((project, index) => (
            <li key={project.attributes.slug}>
              <ProjectCard
                project={project}
                flipped={index > 0 && index % 2 === 1}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default RelatedProjectsSection
