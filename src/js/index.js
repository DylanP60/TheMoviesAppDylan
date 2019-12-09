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
          // ----------------------- Loader test ------------------------- //
          const whenScrollIsAtBottom = (callback) => {
            let canRun = true;

            window.addEventListener(
              'scroll',
              () => {
                if (
                  window.innerHeight + window.scrollY >= document.body.offsetHeight
                  && typeof callback === 'function'
                  && canRun
                ) {
                  callback();
                  canRun = false;

                  setTimeout(() => {
                    canRun = true;
                  }, 1000);
                }
              },
              false,
            );
          };

          const loadMore = () => {
            setTimeout(() => {
              const htmlToAdd = `
                  <div class="row mb-2">
                    <div class="col-md-6">
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
                            <button type="button" class="view-more btn btn-primary" onclick="window.location.href='movie.html?movie='">View More</button>       
                         </div>                       
                        </div>
                      </div>
                    </div>
                  </div>
                  `;
              document.getElementById('elements').innerHTML += htmlToAdd;
            }, 1000);
          };

          whenScrollIsAtBottom(loadMore);
          // ----------------------- Loader test Fin ------------------------- //

          const html = ` <div class="row mb-2">
                            <div class="col-md-6">
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
                                    <button type="button" class="view-more btn btn-primary" onclick="window.location.href='movie.html?movie='">View More</button>       
                                 </div>                       
                                </div>
                              </div>
                            </div>
                          </div>`;
          document.getElementById('listMovies').innerHTML += html;
          document.getElementById('iconIDDeclenche').addEventListener('click', () => {
            // console.log(this);
            if (document.getElementById('iconID').classList.contains('far') === true) {
              document.getElementById('iconID').classList.remove('far');
              document.getElementById('iconID').classList.add('fas');
            } else {
              document.getElementById('iconID').classList.add('far');
              document.getElementById('iconID').classList.remove('fas');
            }
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


/* const app = { test: "test"};
const app2 = { ...app2};

document.getElementById("app").innerHTML = app.test; */
