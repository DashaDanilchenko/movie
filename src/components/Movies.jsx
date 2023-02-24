import { useEffect, useState } from "react"
import CardMovie from "./CardMovie"
import {apiGenres} from "./api"

const Movies = ({movies, moviesFavorite, addMovie, deleteMovie}) => {

  const [genres, setGenres] = useState ([])


  useEffect (() => {
    fetch(`${apiGenres}`)
    .then(data => data.json())
    .then(movie => setGenres(movie.genres))
  },[])

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
      <button>List favorite movie</button>
      {movies.map((movie) => <CardMovie key={movie.id} movie={movie} searchGenres={searchGenres} moviesFavorite={moviesFavorite} addMovie={addMovie} deleteMovie={deleteMovie} movies={movies}/>)}
    </div>
  )
}

export default Movies