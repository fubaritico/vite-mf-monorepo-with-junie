import { QueryClient, useQuery } from '@tanstack/react-query'
import { Link, useLoaderData } from 'react-router-dom'

import { fetchPopularMovies, getImageUrl } from '../services/api'

import './List.css'

import type { FC } from 'react'

type ThisComponent = FC & {
  loader: (queryClient: QueryClient) => () => Promise<MovieListResponse>
}

const query = () => ({
  queryKey: ['getMovies'],
  queryFn: async () => fetchPopularMovies(),
})

const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(query())
}

const List: ThisComponent = () => {
  const initialData = useLoaderData<MovieListResponse>()

  const { data: movies, error } = useQuery<MovieListResponse>({
    ...query(),
    initialData,
  })

  if (error) {
    return <div className="error">{error.message}</div>
  }

  return (
    <div className="movie-grid-list">
      {movies.results.map((movie) => (
        <Link
          to={`/detail/${movie.id.toString()}`}
          key={movie.id}
          className="movie-grid-card"
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
