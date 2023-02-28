import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardMovie from './CardMovie'
import { apiGenres } from './api'

const Movies = ({ movies, moviesFavorite, addMovie, deleteMovie, findId}) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    fetch(`${apiGenres}`)
      .then((data) => data.json())
      .then((movie) => setGenres(movie.genres))
  }, [])

  function searchGenres(ids) {
    let arr = []
    ids.forEach((id) => {
      genres.forEach((g) => {
        if (g.id === id) arr.push(g.name)
      })
    })
    return arr.join(', ')
  }

  return (
    <div>
      <Link to="list">
        <button>List favorite movie</button>
      </Link>
      {movies.map((movie) => (
        <Link to="single">
          <CardMovie
            key={movie.id}
            movie={movie}
            searchGenres={searchGenres}
            moviesFavorite={moviesFavorite}
            addMovie={addMovie}
            deleteMovie={deleteMovie}
            findId={findId}
          />
        </Link>
      ))}
    </div>
  )
}

export default Movies
