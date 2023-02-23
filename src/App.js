import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import ListFavorite from './components/ListFavorite';
import SingleMovie from './components/SingleMovie';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route>
          <Route path="/" element={<Movies />}/>
            <Route path="*" element={<NotFound />}/>
            <Route path="list" element={<ListFavorite />}/>
            <Route path=":idMovie" element={<SingleMovie />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
