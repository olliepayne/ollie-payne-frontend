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

export type BlogPostData = {
  attributes: BlogPostAttributes
  id: number
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
  hero?: StrapiImage
  name: string
  snippet: string
  datePublished: string
  dateEdited?: string
  content: string
  liveUrl?: string
}

export type ProjectData = {
  attributes: ProjectAttributes
  id: number
}

export type Projects = {
  data: ProjectData[]
  meta: StrapiMeta
}
