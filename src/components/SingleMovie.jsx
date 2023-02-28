import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiKey, apiImg } from './api'

const SingleMovie = ({idMovie}) => {

  const [movie, setMovie] = useState({})
  const [g, setG] = useState ('')

  useEffect (() => {
    fetch (`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${apiKey}`)
    .then(data => data.json())
    .then(movie => setMovie(movie))
  }, [idMovie])

  console.log(movie.genres)

  // useEffect (() => {
  //   setG(movie.genres.map(id => (id.name)).join(', '))
  // }, [movie.genres])

  return (
    <div>
      <Link to=".." relative="path"><button>on the main</button></Link>
      <div>
        <h2>{movie.title}</h2>
        <img src={`${apiImg}${movie.poster_path}`} alt="poster" />
        <p>{g}</p>
      </div>
    </div>
  )
}

export default SingleMovie