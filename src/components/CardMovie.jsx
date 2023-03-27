import { Link } from 'react-router-dom'
import styles from '../styles/CardMovie.module.css'
import { apiImg } from './api'

const CardMovie = ({
  movie,
  searchGenres,
  moviesFavorite,
  addMovie,
  deleteMovie,
  findId
}) => {
  const { title, poster_path, genre_ids, id } = movie

  function isFavorite(id) {
    return !!moviesFavorite.find((i) => i.id === id)
  }

  return (
    <div className={styles.movie} >
      <div >
        <img src={`${apiImg}${poster_path}`} alt="poster"/>
        <button className={styles.button}>
          {isFavorite(id) ? (
            <div className={styles.like} onClick={() => deleteMovie(id)}>
              delete
            </div>
          ) : (
            <div className={styles.like} onClick={() => addMovie(id)}>
              add
            </div>
          )}
        </button>
      </div>
      <div className={styles.info}>
        <Link to="single"><div className={styles.name_cursor}  onClick={() => findId(id)}>{title}</div></Link>
        <div className={styles.genre}>genre: {searchGenres(genre_ids)}</div> 
      </div>
    </div>
  )
}

export default CardMovie
