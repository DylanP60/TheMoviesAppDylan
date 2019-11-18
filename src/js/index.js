import '../scss/styles.scss';
import fontawesome from '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import regular from '@fortawesome/fontawesome-free/scss/regular.scss';
import solid from '@fortawesome/fontawesome-free/scss/solid.scss';
import brands from '@fortawesome/fontawesome-free/scss/brands.scss';
import searchAPI from './services/searchAPI';

const search = searchAPI('https://api.themoviedb.org/3/movie/', '0a6cafde615aae846797c8848c1902b0');

search((results) => {
console.log(results);
//document.getElementById('img').src = results.poster_path;
document.getElementById('title').innerHTML = results.original_title + " " + results.release_date;
document.getElementById('overview').innerHTML = results.overview;
}); 





/* const app = { test: "test"};
const app2 = { ...app2};

document.getElementById("app").innerHTML = app.test; */
