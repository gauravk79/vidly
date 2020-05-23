import React, { Component } from 'react';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {

    columns = [
        { label: 'Title', path: 'title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { label: 'Genre', path: 'genre.name' },
        { label: 'Stock', path: 'numberInStock' },
        { label: 'Rate', path: 'dailyRentalRate' },
        { key: 'like', content: (movie) => <Like isLiked={movie.liked} onLike={() => this.props.onLike(movie._id)} /> },
        { key: 'delete', content: (movie) => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm m-2">Delete</button> }
    ];
    constructor() {
        super();
        const user = auth.getCurrentUser();
        console.log(user);
        if (!user || !user.isAdmin) {
            this.columns.splice(-1);
        }
    }

    render() {
        const { movies, sortColumn, onSort } = this.props;        
        
        return (
            <Table
                sortColumn={sortColumn}
                columns={this.columns}
                onSort={onSort}
                data={movies}
                idproperty='_id'
            />
        );
    }
}

export default MoviesTable;
