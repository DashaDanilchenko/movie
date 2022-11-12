let page = document.querySelector('.page')

function watchList() {
    page.innerHTML = `<div class="list">
    <h2>Watch list</h2>
    <div class="btn main_page">main page</div>
    <div class="list_movie"></div>
</div>`

const listMovie = document.querySelector('.list_movie')
    
const list =  arrListLike.map((m) => movieItem(m)) 
listMovie.append(...list)

const mainPage = document.querySelector('.main_page')
mainPage.addEventListener('click', () => location.href = '/index.html')
}

watchList()