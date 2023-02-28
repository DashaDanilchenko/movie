import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {apiMovie} from "./components/api"
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import ListFavorite from './components/ListFavorite';
import SingleMovie from './components/SingleMovie';


function App() {

  const [movies, setMovie] = useState ([])
  const [moviesFavorite, setMoviesFavorite] = useState (() => {
    return (JSON.parse(localStorage.getItem('moviesFavorite'))) || [] })
  const [idMovie, setIdMovie] = useState('') 

    useEffect (() => {
      localStorage.setItem('moviesFavorite', JSON.stringify(moviesFavorite))
  }, [moviesFavorite])

  useEffect (() => {
    fetch(`${apiMovie}`)
    .then(data => data.json())
    .then(movie => setMovie(movie.results))
  },[])

  function addMovie (id) {
    const movieItem = movies.find(item => item.id === id)
    setMoviesFavorite([...moviesFavorite, movieItem])
  }
  
  function deleteMovie (id) {
    setMoviesFavorite(moviesFavorite.filter((todo) => todo.id !== id))
  }

  console.log(moviesFavorite)


  function findId(id) {
    setIdMovie(`${id}`)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route>
          <Route path="/" element={<Movies movies={movies} moviesFavorite={moviesFavorite} addMovie={addMovie} deleteMovie={deleteMovie} findId={findId}/>}/>
            <Route path="*" element={<NotFound />}/>
            <Route path="list" element={<ListFavorite moviesFavorite={moviesFavorite} addMovie={addMovie} deleteMovie={deleteMovie}/>}/>
            <Route path="single" element={<SingleMovie idMovie={idMovie}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
