const apiKey = "61451d30700be40f9a0f45ccb9c478b2"
const apiMovie = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
const apiGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
const apiImg = "https://image.tmdb.org/t/p/w154/"


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

let container
let page = document.querySelector('.page')

async function firstPage() {
    page.innerHTML = `<div class="content">
    <header>
        <div class="grid btn">Watch list</div>
        <h2 class="grid center">Popular Movies</h2>
        <div class="grid right">
            <label for="input">Search</label>
            <input class="seach" type="text">
        </div>
    </header>
    <div class="container"></div>
    </div>` 

    container = document.querySelector('.container')
    
    const button = document.querySelector('.btn')
    button.addEventListener('click', watchList)

    const movies = await informationSearch(apiMovie)

    const seach = document.querySelector('.seach')

    if (!seach.value) {
        rendeCardMovie(movies)
    }

    async function searchMovie() {
        let enterText = seach.value
        let nameOne = String(enterText).toLowerCase().split('') || []
        let movieSearch = []
        movies.forEach((m) =>  {
                let nameToo = String(m.title).toLowerCase().split('') 
                let audit = []
                for (let i = 0; i < nameOne.length; i++) {                                      
                    audit.push(nameToo[i])                 
                }
                if (audit.join('') === enterText) {
                    movieSearch.push(m)
                   }
            })
            rendeCardMovie(movieSearch)
    }
    seach.addEventListener('input', searchMovie)
}
await firstPage()

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
                
     return cardMovie          
}

function rendeCardMovie(arr) { 
    const cards =  arr.map((m) => createMovieCard(m)) 
    container.append(...cards)
}


const list = document.querySelector('.list')


async function watchPage() {
        await firstPage()
    }

    function movieItem ({title, id}) {
                return `<li class="display">
                <div class="name">${title}</div> 
                <div class="like" id="${id}">add</div>
                </li>` 
    }

    function watchList() {
        page.innerHTML = `<div class="list">
        <h2>Watch list</h2>
        <div class="btn main_page">main page</div>
        <div class="list_movie"></div>
    </div>`

    const listMovie = document.querySelector('.list_movie')
    listMovie.innerHTML = `<ul>
        ${arrListLike.map((m) => movieItem(m)).join('')}   
    </ul>`

    // const like = document.querySelectorAll('.like')
    // const disLike = document.querySelectorAll('.dis_like')

    // like.forEach(l => l.addEventListener('click', add))
    // disLike.forEach(d => d.addEventListener('click', del))

    const mainPage = document.querySelector('.main_page')
    mainPage.addEventListener('click', watchPage)
    }

    async function saveFavoriteMovie() {
       localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
    }

    