const apiImg = "https://image.tmdb.org/t/p/w154/"

let movies = []

async function moviesAll() {
    movies = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=61451d30700be40f9a0f45ccb9c478b2&language=en-US&page=1")
    .then(date => date.json())
    .then(date => (date.results))

}


let genres = []

async function genresAll() {
    genres = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=61451d30700be40f9a0f45ccb9c478b2&language=en-US")
    .then(date => date.json())
    .then(date => (date.genres))
console.log(genres)
}


let strGens

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
    console.log(strGens)
    return strGens
}

let container
let page = document.querySelector('.page')
async function firstPage() {
    await moviesAll()
    console.log(movies)
    page.innerHTML = `<div class="content">
    <header>
        <div class="grid btn">Watch list</div>
        <h2 class="grid center">Popular Movies</h2>
        <div class="grid right">Search</div>
    </header>
    <div class="container">rid</div>
    </div>` 

    container = document.querySelector('.container')
    
    await createCardMovie()
    
    const button = document.querySelector('.btn')
    button.addEventListener('click', watchList)
}
await firstPage()

  
async function createCardMovie() { 
    await genresAll()
    container.innerHTML = `${
        movies.map((m) => { 
        searchGenres(m.genre_ids)
          return `<div class="movie">
          <div class="image"><img src="${apiImg}${m.poster_path}"></div>
          <div class="info">
              <div class="name">${m.title}</div>
              <div class="genre">genre:${strGens}</div>
              <div class="button">
                <div class="like" id="${m.id}">add</div>
                <div class="dis_like none" id="${m.id}">delete</div>
              </div>
          </div>
          </div>`  
        }).join('') 
    }`

const like = document.querySelectorAll('.like')
const disLike = document.querySelectorAll('.dis_like')

like.forEach(l => l.addEventListener('click', add))
disLike.forEach(d => d.addEventListener('click', del))

}

let odjMovie = {}
const arrListLike = []

function add() {
    this.nextElementSibling.classList.remove('none')
    this.classList.add('none')
    let movId = this.id
    createObjMovie(movId)
    arrListLike.push(odjMovie)
    console.log(arrListLike)
}

function del() {
    this.previousElementSibling.classList.remove('none')
    this.classList.add('none')
    let movId = this.id
    delObjMovie(movId)
}

async function createObjMovie(idM) {
    movies.forEach(mov => {
        if (String(mov.id) === String(idM)) {
            odjMovie = {
                id:mov.id,
                name:mov.title,
            }
        }
    })
    return odjMovie
}

async function delObjMovie(idM) {
    arrListLike.filter(mov => {
            console.log(mov)
            if(String(mov.id) === String(idM)) {
                const index = arrListLike.indexOf(mov)
                console.log(index)
                arrListLike.splice(index, 1)
            }
    })
    return arrListLike
}


const list = document.querySelector('.list')


async function watchPage() {
        await firstPage()
    }

    function watchList() {
        console.log(1)
        page.innerHTML = `<div class="list">
        <h2>Watch list</h2>
        <div class="btn main_page">main page</div>
        <div class="list_movie"></div>
    </div>`

    const listMovie = document.querySelector('.list_movie')
    listMovie.innerHTML = `
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>`

    const mainPage = document.querySelector('.main_page')
    mainPage.addEventListener('click', watchPage)
    }


