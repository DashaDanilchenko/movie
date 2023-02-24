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
  const [moviesFavorite, setMoviesFavorite] = useState ([])

  useEffect (() => {
    fetch(`${apiMovie}`)
    .then(data => data.json())
    .then(movie => setMovie(movie.results))
  },[])

  function addMovie (arr, id) {
    const movieItem = arr.find(item => item.id === id)
    setMoviesFavorite([...moviesFavorite, movieItem])
  }
  
  function deleteMovie (arr, id) {
    setMoviesFavorite(arr.filter((todo) => todo.id !== id))
  }

  console.log(moviesFavorite)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route>
          <Route path="/" element={<Movies movies={movies} moviesFavorite={moviesFavorite} addMovie={addMovie} deleteMovie={deleteMovie}/>}/>
            <Route path="*" element={<NotFound />}/>
            <Route path="list" element={<ListFavorite movies={movies} moviesFavorite={moviesFavorite} addMovie={addMovie} deleteMovie={deleteMovie}/>}/>
            <Route path=":idMovie" element={<SingleMovie />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
