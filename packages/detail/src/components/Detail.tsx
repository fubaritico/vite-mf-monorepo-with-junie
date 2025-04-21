import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetail, getImageUrl } from '../services/api'
import { Movie } from '../types/movie'
import './Detail.css'
import '../index.css'

const Detail = () => {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMovieDetail = async () => {
      if (!id) return

      try {
        setLoading(true)
        const data = await fetchMovieDetail(id)
        setMovie(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getMovieDetail()
  }, [id])

  if (loading) {
    return <div className="loading">Loading movie details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!movie) {
    return <div className="error">Movie not found</div>
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
        {(movie.budget || movie.revenue) && (
          <div className="movie-stats">
            {movie.budget > 0 && (
              <div className="stat">
                <span className="stat-label">Budget:</span>
                <span className="stat-value">
                  ${movie.budget.toLocaleString()}
                </span>
              </div>
            )}
            {movie.revenue > 0 && (
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
