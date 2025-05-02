import { QueryClient, useQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from 'react-router-dom'

import { fetchPopularMovies, getImageUrl } from '../services/api'

import './List.css'

import type { FC } from 'react'

export type RouteComponent = FC & {
  loader: (queryClient: QueryClient) => () => Promise<MovieListResponse>
}

const query = () => ({
  queryKey: ['getMovies'],
  queryFn: async () => {
    try {
      return await fetchPopularMovies()
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      throw error
    }
  },
})

const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(query())
}

const List: RouteComponent = () => {
  const initialData = useLoaderData<MovieListResponse>()

  const { data: movies, error } = useQuery<MovieListResponse>({
    ...query(),
    initialData,
  })

  if (error) {
    return <div className="error">{error.message}</div>
  }

  return (
    <div data-testid="movie-grid-list" className="movie-grid-list">
      {movies.results.map((movie) => (
        <Link
          to={`/detail/${movie.id.toString()}`}
          key={movie.id}
          className="movie-grid-card"
          data-testid="movie-grid-card"
        >
          <div className="movie-grid-poster">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={`${movie.title} poster`}
            />
          </div>
          <div className="movie-grid-title">{movie.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default List

List.loader = loader
