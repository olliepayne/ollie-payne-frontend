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

export type BlogPostMeta = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export type BlogPost = {
  data: BlogPostData[]
  meta: BlogPostMeta
}
