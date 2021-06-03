const API_KEY = 'api_key=4c3ad92dbbd8b98710480f66cb2e91bf';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const SEARCH_URL = '/search/movie?';

const form = document.getElementById('form');
const search = document.getElementById('search');
const tags = document.querySelector('.tags');

const genres = [
   {id:28,name:"Action"},
   {id:12,name:"Adventure"},
   {id:16,name:"Animation"},
   {id:35,name:"Comedy"},
   {id:80,name:"Crime"},
   {id:99,name:"Documentary"},
   {id:18,name:"Drama"},
   {id:10751,name:"Family"},
   {id:14,name:"Fantasy"},
   {id:36,name:"History"},
   {id:27,name:"Horror"},
   {id:10402,name:"Music"},
   {id:9648,name:"Mystery"},
   {id:10749,name:"Romance"},
   {id:878,name:"Science Fiction"},
   {id:10770,name:"TV Movie"},
   {id:53,name:"Thriller"},
   {id:10752,name:"War"},
   {id:37,name:"Western"}
]

const selectedGenre = [];

getGenre();
function getGenre() {
   tags.innerHTML = '';
    genres.forEach(genre => {
       const tag = document.createElement('div');
       tag.classList.add('tag');
       tag.id = genre.id;
       tag.innerText = genre.name;
         
       tag.addEventListener('click', () => {
          if(selectedGenre.length == 0) {
             selectedGenre.push(tag.id);
          }else {
             if(selectedGenre.includes(tag.id)) {
                selectedGenre.forEach((id, idx) => {
                   if(id == tag.id) {
                      selectedGenre.splice(idx, 1);
                   }
                })
             }else{
                selectedGenre.push(tag.id);
             }
          }
          getMovie(API_URL+'&with_genres='+encodeURI(selectedGenre.join(', ')));
          console.log(selectedGenre);
       })

       tags.append(tag);
    })
}



getMovie(API_URL);

function getMovie(url) {
     fetch(url).then(res => res.json()).then(data => {
         showMovie(data.results);
     })
}

function showMovie(data) {
    main.innerHTML = '';

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