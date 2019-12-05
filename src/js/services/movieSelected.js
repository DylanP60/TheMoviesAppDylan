import axios from 'axios';
/* import apiKey from 'apiKey';
import urlApi from 'urlApi'; */

// Movie selected
const movieSelected = (urlApi, apiKey) => (id, callback) => {
  const request = axios.get(`${urlApi}/movie/550?api_key=${apiKey}`);
  request.then(({ data }) => callback(data));
};

export default movieSelected;
