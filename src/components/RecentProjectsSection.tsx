/** @jsxImportSource theme-ui */

// Packages
import { Container, Heading } from "theme-ui"

// My components
import ProjectCard from "components/ProjectCard"

// Helpers
import { Projects } from "helpers/myTypes"

// Props
type RecentProjectsSection = {
  projects?: Projects
}

const RecentProjectsSection = ({ projects }: RecentProjectsSection) => {
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
          Recent Projects
        </Heading>
        <ul
          sx={{
            p: 0,
            listStyle: "none"
          }}
        >
          {/* Map projects here */}
          {projects?.data.map((project, index) => (
            <li
              key={project.attributes.slug}
              sx={{
                my: index > 0 ? 4 : 0
              }}
            >
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

export default RecentProjectsSection
