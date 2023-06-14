export type Meta = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
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
  cover: {
    data: {
      id: number
      attributes: {
        url: string
        alternativeText: string
      }
    }
  }
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
  meta: Meta
}

// Project
export type ProjectAttributes = {
  slug: string
  pageTitle: string
  metaDescription: string
  name: string
  description: string
  content: string
  deployedUrl: string
}
