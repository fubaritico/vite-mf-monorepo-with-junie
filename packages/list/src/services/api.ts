import { MovieListResponse } from '../types/movie';

// Note: In a real application, you would store this in an environment variable
const API_KEY = '3e837009f7b0b32d4a592ddb3c47b1c3'; // This is a dummy key, replace with a real TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1): Promise<MovieListResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getImageUrl = (path: string, size = 'w500'): string => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
