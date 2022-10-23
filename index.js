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
const arrListLike = []
let storage = JSON.parse(localStorage.getItem('arrListLike')) || []

const genres = await informationSearch(apiGenres)

async function searchGenres(ids) {
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
        createCardMovie(movies)
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
            createCardMovie(movieSearch)
    }
    seach.addEventListener('input', searchMovie)
}
await firstPage()


async function cardMovie ({genre_ids, poster_path, title, id}) {
    await searchGenres(genre_ids)
    console.log(await searchGenres(genre_ids))
    arrListLike.forEach(s => {
            if (String(s.id) === String(id)) {
                return `<div class="movie">
                <div class="image"><img src="${apiImg}${poster_path}"></div>
                <div class="info">
                    <div class="name">${title}</div>
                    <div class="genre">genre:${strGens}</div>
                    <div class="button">
                      <div class="dis_like" id="${id}">delete</div>
                    </div>
                </div>
                </div>`}
                else {
                return `<div class="movie">
                <div class="image"><img src="${apiImg}${poster_path}"></div>
                 <div class="info">
                    <div class="name">${title}</div>
                     <div class="genre">genre:${strGens}</div>
                    <div class="button">
                        <div class="like" id="${id}">add</div>
                    </div>
                </div>
                </div>` 
                }
             })
}

function createCardMovie(arr) { 
    container.innerHTML = `${
        arr.map((m) => cardMovie(m)).join('') 
    }`

   
const like = document.querySelectorAll('.like')
const disLike = document.querySelectorAll('.dis_like')

like.forEach(l => l.addEventListener('click', add))
disLike.forEach(d => d.addEventListener('click', del))

}

function add() {
    let movId = this.id
    saveList(movId)
    saveMemory()
}

function del() {
    let movId = this.id
    delObjMovie(movId)
    saveMemory()
}

async function saveList(idM) {
    const movies = await informationSearch(apiMovie)
    movies.forEach(mov => {
        if (String(mov.id) === String(idM)) {
            arrListLike.push(mov) 
        }
    })
    console.log(arrListLike)
    return arrListLike
}

async function delObjMovie(idM) {
    arrListLike.filter(mov => {
            if(String(mov.id) === String(idM)) {
                const index = arrListLike.indexOf(mov.id)
                arrListLike.splice(index, 1)
            }
    })
    console.log(arrListLike)
    return arrListLike
}


const list = document.querySelector('.list')


async function watchPage() {
        await firstPage()
    }

    function movieItem ({title, id}) {

        arrListLike.forEach(s => {
            if (String(s.id) === String(id)) {
                return `<li class="display">
        <div class="name">${title}</div> 
        <div class="dis_like" id="${id}">delete</div>
        </li>`}
            else {
                return `<li class="display">
                <div class="name">${title}</div> 
                <div class="like" id="${id}">add</div>
                </li>` 
            }
            })
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

    const like = document.querySelectorAll('.like')
    const disLike = document.querySelectorAll('.dis_like')

    like.forEach(l => l.addEventListener('click', add))
    disLike.forEach(d => d.addEventListener('click', del))

    const mainPage = document.querySelector('.main_page')
    mainPage.addEventListener('click', watchPage)
    }

    async function saveMemory() {
       localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
    }

    