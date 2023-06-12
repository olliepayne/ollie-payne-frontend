type Meta = {
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

export type BlogPost = {
  data: BlogPostData[]
  meta: Meta
}

// Timeline event
export type TimelineEventAttributes = {
  institutionName: string
  occupationTitle: string
  // timeInvestment?: string
  startDate: {
    month: string
    year: number
  }
  endDate?: {
    month: string
    year: number
  }
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
