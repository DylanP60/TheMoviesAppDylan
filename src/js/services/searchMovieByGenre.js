import axios from 'axios';

const searchMovieByGenre = (url, apiKey) => (callback) => {
  const request = axios.get(
    `${url}/genre/movie/list?api_key=${apiKey}&language=en-US`,
  );
  request.then(({ data }) => callback(data));
};

export default searchMovieByGenre;
