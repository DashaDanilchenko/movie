

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
    watchList()
    saveFavoriteMovie()
}
function saveFavoriteMovie() {
    localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
}

const mainPage = document.querySelector('.main_page')
mainPage.addEventListener('click', () => location.href = '/index.html')
function movieItem (movei) {
    
    const {title, id} = movei
    const movieLike = document.createElement('div')
     movieLike.innerHTML = `<li class="display">
            <div class="name">${title}</div> 
            <button class="button">
                    ${
                    isFavorite(id)   
                    ?'<div class="like">delete</div>'
                    :'<div class="like">add</div>'
                }
                </button>
            </li>`

    const btnLikeDislike = movieLike.querySelector('button')
    btnLikeDislike.addEventListener('click', () => toggleFavoriteAndRenderMovie(movei))

    return movieLike 
    }

function watchList() {

const listMovie = document.querySelector('.list_movie')
    
const list =  arrListLike.map((m) => movieItem(m)) 
listMovie.append(...list)
}

watchList()