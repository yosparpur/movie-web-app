//prepare data
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"
const API_URL_MOVIE = 'https://api.themoviedb.org/3'
const IMG_MOVIE_PATH = 'https://image.tmdb.org/t/p/w1280'
const PAGE_NUMBER = 1

// list api data
const API_URL_HOME = `${API_URL_MOVIE}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_SEARCH = `${API_URL_MOVIE}/search/movie?api_key=${API_KEY}&query=`
const API_URL_NOW_PLAYING = `${API_URL_MOVIE}/movie/now_playing?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_POPULAR = `${API_URL_MOVIE}/movie/popular?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_TOPRATED = `${API_URL_MOVIE}/movie/top_rated?api_key=${API_KEY}&page=${PAGE_NUMBER}`
const API_URL_TRENDING = `${API_URL_MOVIE}/trending/movie/week?api_key=${API_KEY}`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL_HOME)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    
    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ""

    console.log(movies)

    movies.forEach((movie) => {
        const { title, release_date, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_MOVIE_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
              <h3>
                ${title}
                <div class="text-release">Release: ${release_date}</div>
              </h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
              <h3>Overview</h3>
              ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if (vote >= 8){
        return "green";
    } else if (vote >= 5){
        return "orange";
    }else{
        return "red"
    }
}

function setActiveMenu(clickedElement, filter){
    var listItems = document.querySelectorAll("li a")
    listItems.forEach(function(item){
        item.classList.remove("active");
    })

    clickedElement.classList.add("active")

    switch (filter) {
        case "home":
            getMovies(API_URL_HOME)
            break;
        case "now-playing":
            getMovies(API_URL_NOW_PLAYING)
            break;
        case "popular":
            getMovies(API_URL_POPULAR)
            break;
        case "top-rated":
            getMovies(API_URL_TOPRATED)
            break;
        case "trending":
            getMovies(API_URL_TRENDING)
            break;
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm = search.value
    if (searchTerm && searchTerm !== ""){
        getMovies(API_URL_SEARCH+searchTerm)
        search.value=''
    }else{
        window.location.reload()
    }
})