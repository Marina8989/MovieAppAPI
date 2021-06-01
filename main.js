const API_KEY = 'api_key=4c3ad92dbbd8b98710480f66cb2e91bf';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const SEARCH_URL = '/search/movie?';

const form = document.getElementById('form');
const search = document.getElementById('search');



getMovie(API_URL);

function getMovie(url) {
     fetch(url).then(res => res.json()).then(data => {
         showMovie(data.results);
     })
}

function showMovie(data) {
    main.innerText = '';

    data.forEach(movie => {
       const {title, poster_path, vote_average, overview} = movie;

       const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        movieDiv.innerHTML = `
           <img src="${IMAGE_URL+poster_path}" alt="${title}">
           <div class="movie-info">
              <h3 id="title">${title}</h3>
              <span id="${getVote(vote_average)}">${vote_average}</span>
           </div>
           <div class="overview">
              <h3>Overview</h3>
              ${overview}
           </div>
       `
       main.appendChild(movieDiv);
   })
}

function getVote(vote) {
     if(vote >= 8) {
       return 'green';
     }else if(vote >= 5) {
        return 'yellow';
     }else {
         return 'red';
     }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
   const searchTerm = search.value;
     if(searchTerm) {
        getMovie(BASE_URL +'/search/movie?'+API_KEY +'&query='+searchTerm);
        search.value = '';
     }else{
         getMovie(API_URL);
     }
})