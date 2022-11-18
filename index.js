const apiKey = "61451d30700be40f9a0f45ccb9c478b2"
const apiMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
const apiGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
const apiImg = "https://image.tmdb.org/t/p/w154/"

const button = document.querySelector('.btn')
button.addEventListener('click', () => location.href = '/list.html')

async function informationSearch(api) {
    return await fetch(api)
    .then(data => data.json())
    .then(movie => (movie.results ? movie.results : movie.genres))
}

let arrListLike = []
let storage = JSON.parse(localStorage.getItem('arrListLike')) || []

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

function toggleFavoriteAndRenderMovie(movie) {
       toggleFavorite(movie)
       renderPage()
       saveFavoriteMovie()
}

const genres = await informationSearch(apiGenres)

function searchGenres(ids) {
    let strGens
    let arr = []
    ids.forEach(id => {
        genres.forEach (g => {
           if (g.id === id) 
           arr.push(g.name)
        }) 
    }
    )
    strGens = arr.join(', ')
    return strGens
}

function createMovieCard (movie) {
    const {genre_ids, poster_path, title, id} = movie
    const cardMovie = document.createElement('div')
    cardMovie.innerHTML = `<div class="movie">
                <div class="image"><img src="${apiImg}${poster_path}"></div>
                 <div class="info">
                    <div class="name cursor">${title}</div>
                     <div class="genre">genre:${searchGenres(genre_ids)}</div>
                    <button class="button">
                        ${
                        isFavorite(id)   
                        ?'<div class="like">delete</div>'
                        :'<div class="like">add</div>'
                    }
                    </button>
                </div>
                </div>`      
        const btnLikeDislike = cardMovie.querySelector('button')
        btnLikeDislike.addEventListener('click', () => toggleFavoriteAndRenderMovie(movie))

        const btnMovie = cardMovie.querySelector('.name')
        btnMovie.addEventListener('click', () => location.href = `/movie.html?id=${id}`)
                
     return cardMovie          
}

function renderCardMovie(arr) { 
    let container = document.querySelector('.container')
    const cards =  arr.map((m) => createMovieCard(m)) 
    container.innerHTML = ''
    container.append(...cards)
}

function searchMovie(enterText, movies) {
    let movieSearch = movies.filter(mov => mov.title.toLowerCase().includes(enterText.toLowerCase())) || []
        renderCardMovie(movieSearch)
}

async function renderPage() {
    const movies = await informationSearch(apiMovie)
    const search = document.querySelector('.search')

    if (!search.value) {
        renderCardMovie(movies)
    }

    search.addEventListener('input', () => searchMovie(search.value, movies))
}
await renderPage()

function saveFavoriteMovie() {
    localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
}

if (storage) {
    arrListLike = storage 
    await  renderPage()
}  