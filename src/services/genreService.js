import http from './httpService';
import { apiEndpoint } from '../config.json';
import 'react-toastify/dist/ReactToastify.css';


export function getGenres() {
  return http.get(apiEndpoint + '/genres');  
}

