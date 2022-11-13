
let arrListLike = JSON.parse(localStorage.getItem('arrListLike')) || []
console.log(arrListLike)
let arr = []

function saveFavoriteMovie() {
    localStorage.setItem('arrListLike', JSON.stringify(arrListLike))
}

function isFavorite(movieId) {
    return !!arrListLike.find(({id}) => id === movieId)
}
function toggleFavorite(movei) {
    // if (isFavorite(movei.id)) {
    arrListLike = arrListLike.filter(({id}) => id !== movei.id)

    // 
    //    } 
    //    else {
    //     console.log(movei.indexOf(())
    //     arrFromStorage.splice(movei.indexOf(), 1)
    //    }
}
function toggleFavoriteAndRenderMovie(movei) {
    toggleFavorite(movei)
    saveFavoriteMovie()
    watchList()
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
