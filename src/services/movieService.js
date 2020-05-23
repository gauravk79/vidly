//import * as genresAPI from "./genreService";
import http from './httpService';
import 'react-toastify/dist/ReactToastify.css';

const movieEndpoint = '/movies';

function movieUrl(movieId) {
    return `${movieEndpoint}/${movieId}`; 
}

export function getMovies() {
    return http.get(movieEndpoint);
}

export function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    console.log("saveMovie", movie);
    let obj = { ...movie };
    const newMovie = obj._id === '' || obj._id === undefined;
    obj["genreId"] = movie.genre._id;
    delete obj.genre;
    delete obj._id;
    console.log("posting", obj, newMovie);
    if (!newMovie)
        return http.put(movieUrl(movie._id), obj);
    return http.post(movieEndpoint, obj);

}

export function deleteMovie(id) {
    return http.delete(movieUrl(id));
}

export function likeMovie(id) {
    // let movieInDb = movies.find(m => m._id === id);
    // movieInDb.liked = !movieInDb.liked;
    console.log("movie liked");
}
