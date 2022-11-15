const apiKey = "61451d30700be40f9a0f45ccb9c478b2"
const getMovieUrl = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
const apiGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
const apiImg = "https://image.tmdb.org/t/p/w154/"

const movieElement = document.querySelector('#movie')
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const mainPage = document.querySelector('.main_page')
mainPage.addEventListener('click', () => location.href = '/index.html')

let arrListLike = JSON.parse(localStorage.getItem('arrListLike')) || []

function isFavorite(movieId) {
    return !!arrListLike.find(({id}) => id === movieId)
}

function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
        arrListLike = arrListLike.filter(({id}) => id !== movie.id)
       } else {
        arrListLike.push(movie)
       }
}

function saveFavoriteMovie() {
    localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
}

function toggleFavoriteAndRenderMovie(movie) {
       toggleFavorite(movie)
       renderMovie(movie)
       saveFavoriteMovie()
}

async function informationSearch(api) {
    return await fetch(api)
    .then(data => data.json())
    .then(movie => (movie.genres))
}

const genres = await informationSearch(apiGenres)

function searchGenres(ids) {
    let strGens
    let arr = []
    ids.forEach(gen => {
        genres.forEach (g => {
           if (g.id === gen.id) 
           arr.push(g.name)
        }) 
    }
    )
    strGens = arr.join(', ')
    return strGens
}

function renderMovie(movie)  {
const {genres, poster_path, original_title, id, overview} = movie
movieElement.innerHTML = `<h3>${original_title}</h3>
 <div class="container-movie">
     <div class="image"><img src="${apiImg}${poster_path}"></div>
      <div class="info">
         <div class="name"><span>Overview</span>: ${overview}</div>
         <div class="genre"><span>Genre</span>: ${searchGenres(genres)}</div>
         <button class="button">
             ${
             isFavorite(id)   
             ?'<div class="like">delete</div>'
             :'<div class="like">add</div>'
         }
         </button>
     </div>
 </div>` 

const btnLikeDislike = document.querySelector('button')
btnLikeDislike.addEventListener('click', () => toggleFavoriteAndRenderMovie(movie))
}
 
const getMovie = async () => {
 const url = getMovieUrl(params.id)
 const res = await fetch(url)
 const movie = await res.json()
 renderMovie(movie)
}
 
getMovie()