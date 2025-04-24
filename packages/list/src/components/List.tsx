import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { fetchPopularMovies, getImageUrl } from '../services/api'
import { Movie } from '../types/movie'
import './List.css'

const List = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true)
        const data = await fetchPopularMovies()
        setMovies(data.results)
        setError(null)
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    // eslint-disable-next-line
    getMovies()
  }, [])

  if (loading) {
    return <div className="loading">Loading movies...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="movie-grid-list">
      {movies.map((movie) => (
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
