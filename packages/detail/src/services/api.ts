import { MovieDetailResponse } from '../types/movie'

// Note: In a real application, you would store this in an environment variable
const API_KEY = import.meta.env.VITE_API_KEY // This is a dummy key, replace with a real TMDB API key
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

    return await response.json()
  } catch (error) {
    console.error(`Error fetching movie detail for ID: ${id}`, error)
    throw error
  }
}

export const getImageUrl = (path: string, size = 'w500'): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
