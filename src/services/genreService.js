import http from './httpService';
import 'react-toastify/dist/ReactToastify.css';

const apiEndpoint = '/genres';

export function getGenres() {
  return http.get(apiEndpoint);  
}

