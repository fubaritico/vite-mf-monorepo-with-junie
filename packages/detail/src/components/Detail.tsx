import { QueryClient, useQuery } from '@tanstack/react-query'
import { useLoaderData, useParams } from 'react-router-dom'

import { fetchMovieDetail, getImageUrl } from '../services/api'

import type { FC } from 'react'
import type { Params } from 'react-router-dom'

// Static CSS imports to be shared to host
import './Detail.css'
import '../index.css'

type ThisComponent = FC & {
  loader: (
    queryClient: QueryClient
  ) => ({ params }: { params: Params<'id'> }) => Promise<Movie>
}

const query = (id?: string) => ({
  queryKey: ['movieDetail'],
  queryFn: async () => fetchMovieDetail(id),
})

const loader =
  (queryClient: QueryClient) =>
  ({ params }: { params: Params<'id'> }) => {
    return queryClient.ensureQueryData(query(params.id))
  }

const Detail: ThisComponent = () => {
  const initialData = useLoaderData<Movie>()
  const { id } = useParams<{ id: string }>()

  const { data: movie, error } = useQuery<Movie>({
    ...query(id),
    initialData,
  })

  if (error) {
    return <div className="error">{error.message}</div>
  }

  return (
    <div className="movie-detail">
      <div className="movie-poster">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
        />
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}
        <div className="movie-meta">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          {movie.runtime && <span>{movie.runtime} min</span>}
          <span>{movie.vote_average.toFixed(1)} / 10</span>
        </div>
        <div className="movie-genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>
        <div className="movie-overview">
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
        {(movie.budget ?? movie.revenue) && (
          <div className="movie-stats">
            {movie.budget && movie.budget > 0 && (
              <div className="stat">
                <span className="stat-label">Budget:</span>
                <span className="stat-value">
                  ${movie.budget.toLocaleString()}
                </span>
              </div>
            )}
            {movie.revenue && movie.revenue > 0 && (
              <div className="stat">
                <span className="stat-label">Revenue:</span>
                <span className="stat-value">
                  ${movie.revenue.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail

Detail.loader = loader
