import axios from 'axios';

/* const searchAPI = (url, key) => (callback) => {
  const request = axios.get(
    'https://api.themoviedb.org/3/movie/550?api_key=0a6cafde615aae846797c8848c1902b0',
  ); */

const searchMovieById = (url, id, apiKey) => (callback) => {
  const request = axios.get(
    `${url}${id}?api_key=${apiKey}`,
  );

  request.then(({ data }) => callback(data));
};

export default searchMovieById;
