import styles from '../styles/CardMovie.module.css'
import { apiImg } from './api'

const CardMovie = ({
    movies,  
  movie,
  searchGenres,
  moviesFavorite,
  addMovie,
  deleteMovie,
}) => {
  const { title, poster_path, genre_ids, id } = movie

  function isFavorite(id) {
    return !!moviesFavorite.find((i) => i.id === id)
  }

  return (
    <div className={styles.movie}>
      <div>
        <img src={`${apiImg}${poster_path}`} alt="poster" />
      </div>
      <div className={styles.info}>
        <div className={styles.name_cursor}>{title}</div>
        <div className={styles.genre}>genre:{searchGenres(genre_ids)}</div>
        <button className={styles.button}>
          {isFavorite(id) ? (
            <div className={styles.like} onClick={() => deleteMovie(moviesFavorite, id)}>
              delete
            </div>
          ) : (
            <div className={styles.like} onClick={() => addMovie(movies, id)}>
              add
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default CardMovie
