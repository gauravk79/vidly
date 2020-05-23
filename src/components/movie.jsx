import React from 'react';
import Like from './common/like';


const Movie = (props) => {
    const {movie, onLike, onDelete} = props;   
    return (
        <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like isLiked={movie.liked} onLike={() => onLike(movie._id)} /></td>
                <td><button onClick={() => onDelete(movie._id)} className="btn btn-danger btn-sm m-2">Delete</button></td>
            </tr>
      );
}
 
export default Movie;