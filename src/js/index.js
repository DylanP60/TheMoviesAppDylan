import '../scss/styles.scss';
import fontawesome from '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import regular from '@fortawesome/fontawesome-free/scss/regular.scss';
import solid from '@fortawesome/fontawesome-free/scss/solid.scss';
import brands from '@fortawesome/fontawesome-free/scss/brands.scss';

import apiKey from './services/apiKey';
import urlApi from './services/urlApi';

import searchAPI from './services/searchAPI';
import urlParameters from './services/urlParameters';
import showMovie from './services/showMovie';
import movieSelected from './services/movieSelected';
// import navbar from './services/navbar';
import searchMovieById from './services/searchMovieById';
import searchMovieByGenre from './services/searchMovieByGenre';

// filter
/* import durationRange from './services/durationRange';
import changeButton from './services/changeButton'; */

fontawesome = '';
regular = '';
solid = '';
brands = '';

const test = () => fontawesome + regular + solid + brands;
test();

// const search = searchAPI(`${urlApi}/movie`, `${apiKey}`);

function Time(n) {
  const num = n;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  // num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
  return `${rhours}h${rminutes}`;
}

function stars(number) {
  // total number of stars
  const starTotal = 10;
  const starPercentage = (number / starTotal) * 100;
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  return starPercentageRounded;
}

document.getElementById('searchBar').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    document.getElementById('listMovies').innerHTML = '';
    const searchMovies = searchAPI(`${urlApi}/search/movie`, `${apiKey}&query=${document.getElementById('searchBar').value}`);
    searchMovies((results) => {
      // console.log(results.results);
      results.results.map((movie) => {
        const movieById = searchMovieById(`${urlApi}/movie/`, movie.id, `${apiKey}`);
        movieById((result) => {
          const html = ` <div class="row mb-2">
                              <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col-auto d-none d-lg-block">
                                   <img class="img-movie" src="${result.poster_path != null ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png'}">
                                </div>
                                <div class="col p-4 d-flex flex-column position-static">
                                  <h3 class="mb-0"><span>${result.title}</span><span><i id="iconID" class="fav far fa-heart"></i></span></h3>
                                  <div class="mb-1 text-muted"><span id="date">${result.release_date}</span> | <span id="time">${Time(result.runtime)}</span></div>
                                  <p class="card-text mb-auto"><div id="overview">${result.overview}</div></p>
                                  <div>
                                    <div class="stars-outer">
                                       <div id=vote-average-1 class="stars-inner" style="width:${stars(result.vote_average)}"></div>
                                    </div>
                                    <a id="vote" href="#" class="view-com">${result.vote_count} reviews</a>
                                    <a href="#" type="button" id="detail-film-${result.id}" class="view-more btn btn-primary">View More</a>        
                                 </div>                       
                                </div>
                              </div>
                          </div>`;
          document.getElementById('listMovies').innerHTML += html;
          /*          document.getElementById('iconIDDeclenche').addEventListener('click', () => {
            // console.log(this);
            if (document.getElementById('iconID').classList.contains('far') === true) {
              document.getElementById('iconID').classList.remove('far');
              document.getElementById('iconID').classList.add('fas');
            } else {
              document.getElementById('iconID').classList.add('far');
              document.getElementById('iconID').classList.remove('fas');
            }
          }); */

          const filmDescription = document.querySelectorAll('[id^=detail-film-]');
          filmDescription.forEach((element) => {
            document.getElementById(`${element.id}`).addEventListener('click', () => {
              document.getElementById('listMovies').classList.add('d-none');
              document.getElementById('elements').classList.add('d-none');
              document.getElementById('loader').classList.add('d-none');
              document.getElementById('filmDescription').classList.remove('d-none');

              let idFilm = element.id;
              idFilm = idFilm.split('detail-film-');
              /* idFilm = idFilm[1]; */

              const movieById2 = searchMovieById(`${urlApi}/movie/`, idFilm, `${apiKey}`);
              movieById2((result2) => {
                document.getElementById('img-desc').innerHTML += ` 

                  <img class="img-movie" src="${result2.poster_path != null ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png'}">
                  `;

                document.getElementById('title-desc').innerHTML += result2.title;
                document.getElementById('date-desc').innerHTML += result2.releaseDate;
                document.getElementById('time-desc').innerHTML += Time(result2.runtime);
                document.getElementById('overview-desc').innerHTML += result2.overview;
                document.getElementById('vote-average-1-desc').style.width += result2.vote_average;
                document.getElementById('vote-desc').innerHTML += result2.vote_count;
              });
            });
          });
        }); return null;
      });
    });
  }
});

// test
if (urlParameters.Url().pathname === '/movie.html') {
  if (urlParameters.UrlParamSearchBySelectedMovie()) {
    const selectedMovie = urlParameters.UrlParamSearchBySelectedMovie();
    const movie = movieSelected('https://api.themoviedb.org/3', '0a6cafde615aae846797c8848c1902b0');

    movie(selectedMovie, (results) => {
      document.getElementById('movie-container').innerHTML = showMovie(results);
    });
  }
}


window.onload = function () {
  window.localStorage.setItem('pageMovies', 1);
  window.localStorage.setItem('pageMoviesFirstSearch', true);

  const searchMovies = searchAPI(`${urlApi}/movie/latest`, `${apiKey}`);
  searchMovies((movie) => {
    const movieById = searchMovieById(`${urlApi}/movie/`, movie.id, `${apiKey}`);
    movieById((result) => {
      const html = `      <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                          <div class="col-auto d-none d-lg-block">
                             <img class="img-movie" src="${result.poster_path != null ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png'}">
                          </div>
                          <div class="col p-4 d-flex flex-column position-static">
                            <h3 class="mb-0"><span>${result.title}</span><span><i id="iconID" class="fav far fa-heart"></i></span></h3>
                            <div class="mb-1 text-muted"><span id="date">${result.release_date}</span> | <span id="time">${Time(result.runtime)}</span></div>
                            <p class="card-text mb-auto"><div id="overview">${result.overview}</div></p>
                            <div>
                              <div class="stars-outer">
                                 <div id=vote-average-1 class="stars-inner" style="width:${stars(result.vote_average)}"></div>
                              </div>
                              <a id="vote" href="#" class="view-com">${result.vote_count} reviews</a>
                              <a href="#" type="button" id="detail-film-${result.id}" class="view-more btn btn-primary">View More</a>        
                           </div>                       
                          </div>
                        </div>`;

      document.getElementById('listMovies').innerHTML += html;

      const filmDescription = document.querySelectorAll('[id^=detail-film-]');
      filmDescription.forEach((element) => {
        document.getElementById(`${element.id}`).addEventListener('click', () => {
          document.getElementById('listMovies').classList.add('d-none');
          document.getElementById('elements').classList.add('d-none');
          document.getElementById('loader').classList.add('d-none');
          document.getElementById('filmDescription').classList.remove('d-none');

          let idFilm = element.id;
          idFilm = idFilm.split('detail-film-');
          /* idFilm = idFilm[1]; */

          const movieById3 = searchMovieById(`${urlApi}/movie/`, idFilm, `${apiKey}`);
          movieById3((result3) => {
            document.getElementById('img-desc').innerHTML += ` 

                <img class="img-movie" src="${result3.poster_path != null ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://lightwidget.com/wp-content/uploads/2018/05/local-file-not-found-295x300.png'}">
                `;

            document.getElementById('title-desc').innerHTML += result3.title;
            document.getElementById('date-desc').innerHTML += result3.releaseDate;
            document.getElementById('time-desc').innerHTML += Time(result3.runtime);
            document.getElementById('overview-desc').innerHTML += result3.overview;
            document.getElementById('vote-average-1-desc').style.width += result3.vote_average;
            document.getElementById('vote-desc').innerHTML += result3.vote_count;
          });
        });
      });
    });
  });
};

const getMovieByGenre = searchMovieByGenre(`${urlApi}`, `${apiKey}`);
getMovieByGenre((results) => {
  let htmlForMovieByGenres = '<ul class="list-group list-group-flush">';
  results.genres.map((result) => {
    htmlForMovieByGenres += `<li class="list-group-item">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="gender_${result.id}" name="genders[]">
                            <label class="custom-control-label" for="gender_${result.id}">${result.name}</label>
                          </div>
                        </li>`; return null;
  });
  htmlForMovieByGenres += '</ul>';
  document.getElementById('gender').innerHTML = htmlForMovieByGenres;
});
/* const app = { test: "test"};
const app2 = { ...app2};

document.getElementById("app").innerHTML = app.test; */
