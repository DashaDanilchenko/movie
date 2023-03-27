import styles from '../styles/Movies.module.css'
import { Link } from 'react-router-dom'

const List = ({ moviesFavorite, deleteMovie }) => {
  return (
    <div>
      <Link to=".." relative="path">
        <button className={styles.list}>on the main</button>
      </Link>
      <h2>list favorite movie</h2>
      <ul>
        {moviesFavorite.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <button className={styles.button_delete} onClick={() => deleteMovie(movie.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
