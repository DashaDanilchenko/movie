import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiKey, apiImg } from './api'
import style from '../styles/Movies.module.css'
import styles from '../styles/SingleMovie.module.css'

const SingleMovie = ({idMovie}) => {

  const [movie, setMovie] = useState({})

  useEffect (() => {
    fetch (`https://api.themoviedb.org/3/movie/${idMovie}?api_key=${apiKey}`)
    .then(data => data.json())
    .then(movie => setMovie(movie))
  }, [idMovie])
  
  return (
    <div>
      <Link to=".." relative="path"><button className={style.list}>on the main</button></Link>
      <div className={styles.single_movie}>
        {movie.title && <h2>{movie.title}</h2>}
        {movie.poster_path && <img src={`${apiImg}${movie.poster_path}`} alt="poster" />}
        <p>genre: {movie.genres && movie.genres.map((i) => i.name).join(', ')}</p>
        {movie.overview && <p>{movie.overview}</p>}
      </div>
    </div>
  )
}

export default SingleMovie