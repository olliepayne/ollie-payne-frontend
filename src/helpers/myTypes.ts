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

// Blog post
export type BlogPostAttributes = {
  slug: string
  pageTitle: string
  metaDescription: string
  h1: string
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
  description: string
}

export type TimelineEventData = {
  attributes: TimelineEventAttributes
  id: number
}

export type TimelineEvent = {
  data: TimelineEventData[]
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
}

export type Project = {
  attributes: ProjectAttributes
  id: number
}

export type Projects = {
  data: Project[]
  meta: StrapiMeta
}
