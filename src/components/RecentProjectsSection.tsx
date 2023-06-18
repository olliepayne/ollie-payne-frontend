/** @jsxImportSource theme-ui */
import { Container, Heading } from "theme-ui"
import { Projects } from "helpers/myTypes"
import ProjectCard from "components/ProjectCard"

// Props
type RecentProjectsSection = {
  projects: Projects
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
            textAlign: "center",
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
          {projects.data.map((project, index) => (
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
