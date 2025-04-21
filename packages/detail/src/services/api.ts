import { MovieDetailResponse } from '../types/movie'

const API_KEY = import.meta.env.VITE_API_KEY as string
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchMovieDetail = async (
  id: string
): Promise<MovieDetailResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch movie detail for ID: ${id}`)
    }

    // TODO: use react-query
    // eslint-disable-next-line
    return await response.json()
  } catch (error) {
    console.error(`Error fetching movie detail for ID: ${id}`, error)
    throw error
  }
}

export const getImageUrl = (path: string, size = 'w500'): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
