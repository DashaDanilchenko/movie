const page = document.querySelector('.page')
page.innerHTML = `<div class="content">
<header>
    <div class="grid btn">Watch list</div>
    <h2 class="grid center">Popular Movies</h2>
    <div class="grid right">Search</div>
</header>
<div class="container"></div>
</div>`

const container = document.querySelector('.container')
container.innerHTML = `
<div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>
    <div class="movie"></div>`


    function watchPage() {
        location.reload()
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
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>`

    const mainPage = document.querySelector('.main_page')
    mainPage.addEventListener('click', watchPage)
    }

    const button = document.querySelector('.btn')
    button.addEventListener('click', watchList)
