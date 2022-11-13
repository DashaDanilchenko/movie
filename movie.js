const apiKey = "61451d30700be40f9a0f45ccb9c478b2"
const getMovieUrl = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
const container = document.querySelector('#movie')
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
 

const mainPage = document.querySelector('.main_page')
mainPage.addEventListener('click', () => location.href = '/index.html')

const renderMovie = (movie) => {

 const template = document.querySelector('#movie-template')
 const movieElement = template.content.cloneNode(true)
 
 const titleElement = movieElement.querySelector('h3')
 titleElement.innerText = movie.title
 container.appendChild(movieElement)
}
 
const getMovie = async () => {
 const url = getMovieUrl(params.id)
 const res = await fetch(url)
 const movie = await res.json()
 renderMovie(movie)
}
 
getMovie()