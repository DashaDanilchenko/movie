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


let strGens
let arrListLike = []
let storage = JSON.parse(localStorage.getItem('arrListLike')) || []

function isFavorite(movieId) {
    return !!arrListLike.find(({id}) => id === movieId)
}

function toggleFavorite(movei) {
    if (isFavorite(movei.id)) {
        arrListLike = arrListLike.filter(({id}) => id !== movei.id)
       } else {
        arrListLike.push(movei)
       }
}

function toggleFavoriteAndRenderMovie(movei) {
       toggleFavorite(movei)
       firstPage()
       saveFavoriteMovie()
}

const genres = await informationSearch(apiGenres)

function searchGenres(ids) {
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

function createMovieCard (movei) {
    const {genre_ids, poster_path, title, id} = movei
    searchGenres(genre_ids)
    const cardMovie = document.createElement('div')
    cardMovie.innerHTML = `<div class="movie">
                <div class="image"><img src="${apiImg}${poster_path}"></div>
                 <div class="info">
                    <div class="name">${title}</div>
                     <div class="genre">genre:${strGens}</div>
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
        btnLikeDislike.addEventListener('click', () => toggleFavoriteAndRenderMovie(movei))

        const btnMovie = cardMovie.querySelector('.image')
        btnMovie.addEventListener('click', () => location.href = `/movie.html?id=${id}`)
                
     return cardMovie          
}

function rendeCardMovie(arr) { 
    let container = document.querySelector('.container')
    const cards =  arr.map((m) => createMovieCard(m)) 
    container.innerHTML = ''
    container.append(...cards)
}

function searchMovie(enterText, movies) {
    let movieSearch = movies.filter(mov => mov.title.toLowerCase().includes(enterText.toLowerCase())) || []
        console.log(movieSearch)
        rendeCardMovie(movieSearch)
}

async function firstPage() {

    const movies = await informationSearch(apiMovie)

    const seach = document.querySelector('.seach')

    if (!seach.value) {
        rendeCardMovie(movies)
    }

    seach.addEventListener('input', () => searchMovie(seach.value, movies))
}
await firstPage()

function saveFavoriteMovie() {
    localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
}

if (storage) {
    arrListLike = storage 
    await  firstPage()
}  