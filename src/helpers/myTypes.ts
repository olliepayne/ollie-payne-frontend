// Global
export type StrapiMeta = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export type StrapiImage = {
  data: {
    id: number
    attributes: {
      url: string
      alternativeText: string
    }
  }
}

// Project Tags
export type SkilltagAttributes = {
  name: string
}

export type SkillTag = {
  attributes: SkilltagAttributes
  id: number
}

export type SkillTags = {
  data: SkillTag[]
  meta: StrapiMeta
}

// Blog post
export type BlogPostAttributes = {
  slug: string
  pageTitle: string
  metaDescription: string
  h1: string
  hero: StrapiImage
  datePublished: string
  dateEdited?: string
  content: string
}

export type BlogPost = {
  attributes: BlogPostAttributes
  id: number
}

export type BlogPosts = {
  data: BlogPost[]
  meta: StrapiMeta
}

// Timeline event
export type TimelineEventAttributes = {
  institutionName: string
  cover: StrapiImage
  occupationTitle: string
  commitment: string
  startDate: string
  endDate?: string
  location: string
  description: string
  skillTags: SkillTags
}

export type TimelineEvent = {
  attributes: TimelineEventAttributes
  id: number
}

export type TimelineEvents = {
  data: TimelineEvent[]
  meta: StrapiMeta
}

// Project
export type ProjectAttributes = {
  slug: string
  pageTitle: string
  metaDescription: string
  hero: StrapiImage
  name: string
  snippet: string
  datePublished: string
  dateEdited?: string
  content: string
  liveUrl?: string
  skillTags: SkillTags
}

export type Project = {
  attributes: ProjectAttributes
  id: number
}

export type Projects = {
  data: Project[]
  meta: StrapiMeta
}
