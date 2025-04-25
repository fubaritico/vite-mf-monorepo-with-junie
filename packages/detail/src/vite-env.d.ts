/// <reference types="vite/client" />

declare global {
  export interface Movie {
    id: number
    title: string
    poster_path: string
    overview: string
    release_date: string
    vote_average: number
    genres?: { id: number; name: string }[]
    runtime?: number
    budget?: number
    revenue?: number
    status?: string
    tagline?: string
  }

  export type MovieDetailResponse = Movie
}

export {}
