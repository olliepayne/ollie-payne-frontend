/** @jsxImportSource theme-ui */

// Third-party
import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Image from "next/image"
import { Container, Heading, Flex, Paragraph, Box, Text } from "theme-ui"
import { keyframes } from "@emotion/react"

// My components
import Layout from "components/Layout"
import SEO from "components/SEO"
import LinkedInSVG from "components/svgs/LinkedInSVG"
import GithubSVG from "components/svgs/GithubSVG"
import RecentProjectsSection from "components/RecentProjectsSection"

// Helpers
import { getStrapiUrl } from "helpers/api"
import { Projects, SkillTags } from "helpers/myTypes"
import CodeSVG from "components/svgs/CodeSVG"

// Add: data fetching for headshot, hero image
const projectsUrl = `${getStrapiUrl()}/api/projects`

// Styles
const fadeIn = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

export const getStaticProps: GetStaticProps = async () => {
  const getProjects = async () => {
    const urlPagination =
      "sort[0]=datePublished:desc&pagination[page]=1&pagination[pageSize]=3"
    const urlPopulate = "populate=*"
    const url = `${projectsUrl}?${urlPagination}&${urlPopulate}`

    const res = await fetch(url)
    const data = await res.json()

    return data
  }
  const projects = await getProjects()

  const getSkillTags = async () => {
    const skillTagsUrl = `${getStrapiUrl()}/api/skill-tags`
    const urlSort = `sort[0]=name:asc`
    const url = `${skillTagsUrl}?${urlSort}`

    const res = await fetch(url)
    const data = await res.json()

    return data
  }
  const skillTags = await getSkillTags()

  return {
    props: {
      projects,
      skillTags
    }
  }
}

type Props = {
  projects: Projects
  skillTags: SkillTags
}

export default function Home({ projects, skillTags }: Props) {
  const [skillIndex, setSkillIndex] = useState(0)
  const [currentSkill, setCurrentSkill] = useState(
    skillTags.data[0].attributes.name
  )

  useEffect(() => {
    setTimeout(() => {
      let newSkillIndex = 0
      if (skillIndex < skillTags.data.length - 1) {
        newSkillIndex = skillIndex + 1
      }

      setSkillIndex(newSkillIndex)
      setCurrentSkill(skillTags.data[newSkillIndex].attributes.name)
    }, 5000)
  }, [currentSkill])

  return (
    <Layout>
      <SEO
        title="Ollie Payne - Front-End Developer and SEO Analyst"
        metaDescription="Hi, I'm Ollie. I'm a Front-End Developer, SEO Analyst, and a Competitive Sport Climber and Boulderer currently working and training out of Prescott, AZ."
      />
      {/* Services / About me */}
      <section
        sx={{
          py: [4, 5]
        }}
      >
        <Container>
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: ["column", "row"]
            }}
          >
            <Container
              variant="narrow"
              sx={{
                ml: 0,
                pl: 0
              }}
            >
              <Heading
                as="h1"
                variant="styles.h1"
                sx={{
                  mt: 0
                }}
              >
                Hi, I&apos;m Ollie.
              </Heading>
              <Heading as="h2" variant="styles.h2">
                What I am
              </Heading>
              <ul
                sx={{
                  pl: 3
                }}
              >
                <li>
                  <Heading as="h4">Front-End Developer</Heading>
                </li>
                <li>
                  <Heading as="h4">SEO Analyst</Heading>
                </li>
                <li>
                  <Heading as="h4">
                    Competitive Sport Climber and Boulderer
                  </Heading>
                </li>
              </ul>
              {/* Skills display */}
              <Box>
                <CodeSVG
                  sx={{
                    width: "25px",
                    height: "25px",
                    verticalAlign: "middle",
                    mr: 2
                  }}
                />
                <Text
                  key={`skillIndex:${skillIndex}`}
                  sx={{
                    display: "inline-block",
                    py: 1,
                    px: 2,
                    verticalAlign: "middle",
                    fontWeight: 500,
                    animation: `${fadeIn} 2s`,
                    bg: "myPink"
                  }}
                >
                  {currentSkill}
                </Text>
              </Box>
              <Paragraph
                sx={{
                  mt: 3
                }}
              >
                I currently work and train out of Prescott, Arizona.
              </Paragraph>

              {/* Social links */}
              <ul
                sx={{
                  mt: 3,
                  mb: 0,
                  display: "inline-flex",
                  p: 0,
                  listStyle: "none",
                  "> li:not(:last-child)": {
                    mr: 3
                  }
                }}
              >
                <li>
                  <a
                    href="https://www.linkedin.com/in/oliverpayne01"
                    target="_blank"
                    rel="nofollow noreferrer"
                    sx={{
                      display: "inline-flex",
                      color: "black",
                      fontFamily: "body",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      alignItems: "center",
                      ":hover": {
                        color: "myPink"
                      }
                    }}
                  >
                    <LinkedInSVG
                      sx={{
                        width: "50px",
                        height: "50px"
                      }}
                    />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/olliepayne"
                    target="_blank"
                    rel="nofollow noreferrer"
                    sx={{
                      display: "inline-flex",
                      color: "black",
                      fontFamily: "body",
                      fontWeight: 500,
                      textDecoration: "none",
                      cursor: "pointer",
                      alignItems: "center",
                      ":hover": {
                        color: "myPink"
                      }
                    }}
                  >
                    <GithubSVG
                      sx={{
                        width: "50px",
                        height: "50px",
                        mr: 1
                      }}
                    />
                    Github
                  </a>
                </li>
              </ul>
            </Container>
            <Image
              src="/headshot-temp.jpeg"
              alt="Personal headshot of me, Oliver Payne"
              width={250}
              height={250}
              sx={{
                flex: "0 0 250px",
                mt: [4, 0],
                objectFit: "cover",
                borderRadius: "50%",
                borderColor: "myGray",
                borderWidth: "4px",
                borderStyle: "solid"
              }}
            />
          </Flex>
        </Container>
      </section>

      <RecentProjectsSection projects={projects} />
    </Layout>
  )
}
