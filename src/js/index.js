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

fontawesome = '';
regular = '';
solid = '';
brands = '';

const test = () => fontawesome + regular + solid + brands;
test();

const search = searchAPI(`${urlApi}/movie/', ${apiKey}`);

function Time(n) {
  const num = n;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  // num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).";
  return `${rhours}h${rminutes}`;
}

search((results) => {
  // console.log(results);
  document.getElementById('img').innerHTML = `<img class="img-movie" 
  src="https://image.tmdb.org/t/p/w500//adw6Lq9FiC9zjYEpOqfq03ituwp.jpg">`;
  // document.getElementById('title').innerHTML =
  // `${results.original_title} ${results.release_date}`;
  document.getElementById('title').innerHTML = results.original_title;
  document.getElementById('time').innerHTML = Time(results.runtime);
  document.getElementById('date').innerHTML = results.release_date;
  document.getElementById('overview').innerHTML = results.overview;
  document.getElementById('vote').innerHTML = `${results.vote_count} reviews`;

  document.getElementById('title2').innerHTML = `${results.original_title} ${results.release_date}`;
  document.getElementById('date2').innerHTML = results.release_date;
  document.getElementById('overview2').innerHTML = results.overview;

  document.getElementById('title3').innerHTML = results.original_title;
  document.getElementById('date3').innerHTML = results.release_date;
  document.getElementById('overview3').innerHTML = results.overview;
  document.getElementById('title4').innerHTML = `${results.original_title} ${results.release_date}`;
  document.getElementById('date4').innerHTML = results.release_date;
  document.getElementById('overview4').innerHTML = results.overview;

  document.getElementById('iconID').addEventListener('click', () => {
    if (document.getElementById('iconID').classList.contains('far') === true) {
      document.getElementById('iconID').classList.remove('far');
      document.getElementById('iconID').classList.add('fas');
    } else {
      document.getElementById('iconID').classList.remove('fas');
      document.getElementById('iconID').classList.add('far');
    }
  });
  // total number of stars
  const starTotal = 10;
  const starPercentage = (results.vote_average / starTotal) * 100;
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  document.getElementById('vote-average-1').style.width = starPercentageRounded;
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
