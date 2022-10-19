const apiImg = "https://image.tmdb.org/t/p/w154/"

async function moviesAll() {
    return await fetch("https://api.themoviedb.org/3/movie/popular?api_key=61451d30700be40f9a0f45ccb9c478b2&language=en-US&page=1")
    .then(data => data.json())
    .then(data => (data.results))
}

async function genresAll() {
    return await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=61451d30700be40f9a0f45ccb9c478b2&language=en-US")
    .then(data => data.json())
    .then(data => (data.genres))
}


let strGens

let odjMovie = {}
const arrListLike = []
let storage = JSON.parse(localStorage.getItem('arrListLike')) || []

const genres = await genresAll()

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
    await moviesAll()
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

    const movies = await moviesAll()

    const seach = document.querySelector('.seach')

    if (!seach.value) {
        await createCardMovie(movies)
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
                    console.log(audit.join(''))                  
                }
                if (audit.join('') === nameOne.join('')) {
                    movieSearch.push(m)
                   }
            })

            console.log(movieSearch)
            await createCardMovie(movieSearch)
    }

    seach.addEventListener('input', searchMovie)

}
await firstPage()


async function createCardMovie(arr) { 
    await genresAll()

    container.innerHTML = `${
        arr.map((m) => { 
        searchGenres(m.genre_ids)
        let listCards = `<div class="movie">
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

          storage.forEach(s => {
            if (String(s.id) === String(m.id)) {
                listCards = `<div class="movie">
          <div class="image"><img src="${apiImg}${m.poster_path}"></div>
          <div class="info">
              <div class="name">${m.title}</div>
              <div class="genre">genre:${strGens}</div>
              <div class="button">
                <div class="like none" id="${m.id}">add</div>
                <div class="dis_like" id="${m.id}">delete</div>
              </div>
          </div>
          </div>`
            }
        }) 
         return listCards 
        }).join('') 
    }`

   
const like = document.querySelectorAll('.like')
const disLike = document.querySelectorAll('.dis_like')

like.forEach(l => l.addEventListener('click', add))
disLike.forEach(d => d.addEventListener('click', del))

}

function add() {
    this.nextElementSibling.classList.remove('none')
    this.classList.add('none')
    let movId = this.id
    createObjMovie(movId)
    saveMemory()
}

function del() {
    this.previousElementSibling.classList.remove('none')
    this.classList.add('none')
    let movId = this.id
    delObjMovie(movId)
    saveMemory()
}

async function createObjMovie(idM) {
    const movies = await moviesAll()
    movies.forEach(mov => {
        if (String(mov.id) === String(idM)) {
            odjMovie = {
                id:mov.id,
                name:mov.title,
            }
        }
    })
    arrListLike.push(odjMovie)
    return arrListLike
}

async function delObjMovie(idM) {
    arrListLike.filter(mov => {
            if(String(mov.id) === String(idM)) {
                const index = arrListLike.indexOf(mov.id)
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
        page.innerHTML = `<div class="list">
        <h2>Watch list</h2>
        <div class="btn main_page">main page</div>
        <div class="list_movie"></div>
    </div>`

    const listMovie = document.querySelector('.list_movie')
    listMovie.innerHTML = `
    <ul>
        ${arrListLike.map((m) => { 
              return `<li class="display">
              <div class="name">${m.name}</div> 
              <div class="like none" id="${m.id}">add</div>
              <div class="dis_like" id="${m.id}">delete</div>
              </li>`  
            }).join('') }
       
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

    