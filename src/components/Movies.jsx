import { useEffect, useState } from "react"
import CardMovie from "./CardMovie"
import {apiMovie, apiGenres} from "./api"

const Movies = () => {

  const [movies, setMovie] = useState ([])
  const [genres, setGenres] = useState ([])

  useEffect (() => {
    fetch(`${apiMovie}`)
    .then(data => data.json())
    .then(movie => setMovie(movie.results))
  },[])

  // console.log(movies)

  useEffect (() => {
    fetch(`${apiGenres}`)
    .then(data => data.json())
    .then(movie => setGenres(movie.genres))
  },[])

  // console.log(genres)

  return (
    <div>
      <button>List favorite movie</button>
      {movies.map((movie) => <CardMovie key={movie.id} movie={movie} genres={genres}/>)}
    </div>
  )
}

export default Movies