import { MovieListResponse } from '../types/movie'

const API_KEY = import.meta.env.VITE_API_KEY as string
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchPopularMovies = async (
  page = 1
): Promise<MovieListResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page.toString()}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies')
    }

    // TODO: use react-query
    // eslint-disable-next-line
    return await response.json()
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

export const getImageUrl = (path: string, size = 'w500'): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
