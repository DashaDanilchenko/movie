import { useEffect, useState } from 'react'
import styles from '../styles/CardMovie.module.css'
import { apiImg } from './api'

const CardMovie = ({ movie, genres }) => {
  
  const { title, poster_path, genre_ids } = movie

  const [strGenres, setStrGenres] = useState('')


  useEffect (() => {
    function searchGenres(ids) {
        let arr = []
        ids.forEach((id) => {
            genres.forEach((g) => {
            if (g.id === id) arr.push(g.name)
          })
        })
        setStrGenres(arr.join(', '))
      }
      searchGenres(genre_ids)
  })

  return (
    <div className={styles.movie}>
      <div class="image">
        <img src={`${apiImg}${poster_path}`} alt="poster" />
      </div>
      <div class="info">
        <div class="name cursor">{title}</div>
        <div class="genre">genre:{strGenres}</div>
        <button class="button">
          {' '}
          add
          {/* ${
                        isFavorite(id)   
                        ?'<div class="like">delete</div>'
                        :'<div class="like">add</div>'
                    } */}
        </button>
      </div>
    </div>
  )
}

export default CardMovie
