import { Link } from "react-router-dom"

const List = ({ moviesFavorite, addMovie, deleteMovie}) => {
  function isFavorite(id) {
    return !!moviesFavorite.find((i) => i.id === id)
  }

  return (
    <div>
      <Link to=".." relative="path"><button>on the main</button></Link>
      <h2>list favorite movie</h2>
      <ul>
        {moviesFavorite.map((movie) => (
          <li key={movie.id}>
            {movie.title}{' '}
            {isFavorite(movie.id) ? (
              <button onClick={() => deleteMovie(movie.id)}>delete</button>
            ) : (
              <>
                <button onClick={() => addMovie(movie.id)}>add</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
