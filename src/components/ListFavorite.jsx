import { useState } from 'react'
import { Link } from 'react-router-dom'

const List = ({ moviesFavorite, setMoviesFavorite }) => {
  const [isAdd, setIsAdd] = useState([])

  function addInFavorite(id) {
    setIsAdd(isAdd.filter((i) => i.id === id))
  }

  function deleteInFavorite(movie) {
    setIsAdd([...isAdd, movie])
  }

  function isFavorite(id) {
    return !isAdd.find((i) => i.id === id)
  }

  function result() {
   return moviesFavorite.filter((a) => isAdd.some((b) => a.id === b.id))
  }

console.log(result())


  return (
    <div>
      <Link to=".." relative="path">
        <button>on the main</button>
      </Link>
      <h2>list favorite movie</h2>
      <ul>
        {moviesFavorite.map((movie) => (
          <li key={movie.id}>
            {movie.title}{' '}
            {isFavorite(movie.id) ? (
              <button onClick={() => deleteInFavorite(movie)}>delete</button>
            ) : (
              <>
                <button onClick={() => addInFavorite(movie.id)}>add</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
