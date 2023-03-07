import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardMovie from './CardMovie'
import { apiGenres } from './api'
import SearchMovie from './SearchMovie'

const Movies = ({ movies, moviesFavorite, addMovie, deleteMovie, findId, setMovie, text, setText}) => {
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

  function search() {
   return movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()))
  }

  return (
    <div>
      <Link to="list">
        <button>List favorite movie</button>
      </Link>
      <SearchMovie text={text} setText={setText} />
      {search().map((movie) => (
          <CardMovie
            key={movie.id}
            movie={movie}
            searchGenres={searchGenres}
            moviesFavorite={moviesFavorite}
            addMovie={addMovie}
            deleteMovie={deleteMovie}
            findId={findId}
          />
      ))}
    </div>
  )
}

export default Movies
