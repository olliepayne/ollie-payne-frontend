/** @jsxImportSource theme-ui */

// Packages
import Link from "next/link"
import { Container, Heading } from "theme-ui"

// My components
import ProjectCard from "components/ProjectCard"

// Helpers
import { Projects } from "helpers/myTypes"

type Props = {
  projects?: Projects
}

const RecentProjectsSection = ({ projects }: Props) => {
  return (
    <section
      sx={{
        py: [4, 5],
        bg: "bone"
      }}
    >
      <Container>
        <Heading
          as="h2"
          variant="styles.h2"
          sx={{
            mb: 2
          }}
        >
          Recent Projects
        </Heading>
        <Link
          href="/portfolio"
          sx={{
            variant: "links.primary",
            display: "inline-block",
            mb: 4
          }}
        >
          View All Projects
        </Link>
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
          {projects?.data.map((project, index) => (
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

export default RecentProjectsSection
