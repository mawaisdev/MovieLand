import { useEffect, useState } from 'react'
import MovieCard, { Movie } from './components/MovieCard'
import searchIcon from './assets/search.svg'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = `${import.meta.env.VITE_API_URL}?apikey=${API_KEY}`

  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovie = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    const moviesData = data.Search as Movie[]
    setMovies(moviesData)
  }

  useEffect(() => {
    searchMovie(searchTerm?.length > 0 ? searchTerm : 'Your Name')
  }, [])

  return (
    <div className='app'>
      <h1>Movie Land</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
          }}
        />
        <img
          src={searchIcon}
          alt='Search Icon'
          onClick={() => {
            searchMovie(searchTerm)
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => {
            return <MovieCard {...movie} key={movie.imdbID} />
          })}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  )
}

export default App
