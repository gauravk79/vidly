import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie, likeMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import _ from 'lodash';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Input from './common/input';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: {},
        sortColumn: { path: 'title', order: 'asc' },
        searchQuery: "",
        defaultGenre: { name: "All Genres", _id: "123" }

    }

    async componentDidMount() {
        console.log("componentDidMount - movies");
        const { data } = await getGenres();
        //TODO
        const genres = [this.state.defaultGenre, ...data]//;
        const { data: movies } = await getMovies();
        this.setState(
            {
                movies: movies,
                genres,
                selectedGenre: genres[0]
            });
    }

    render() {
        return (
            (this.state.movies.length === 0 && this.state.selectedGenre === "All") ? <p>There are no movies in the database.</p> : this.renderMovies()
        );
    };

    getPaginatedData = () => {
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn, searchQuery } = this.state;
        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery));

        else if (selectedGenre._id !== "123")
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

        //let filtered = (selectedGenre._id !== "123") ? allMovies.filter(m => m.genre._id === selectedGenre._id) : (searchQuery) ? allMovies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery)): allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: movies };
    };

    renderMovies() {
        const { pageSize, currentPage, selectedGenre, sortColumn, genres, searchQuery } = this.state;
        const { totalCount, data: movies } = this.getPaginatedData();
        const { user } = this.props;
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={selectedGenre} />
                </div>
                <div className="col">
                    {user && <div><button className="btn btn-primary navbar" onClick={() => this.props.history.push("/movies/new")}>New Movie</button></div>}

                    <p>Showing {totalCount} movies in the database.</p>
                    {/* Zen coding */}
                    {/* table.table>thead>tr>th*5 */}

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable
                        movies={movies}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage} />
                </div>
            </div>
        );
    }

    handlePageChange = (pagenum) => {
        console.log(pagenum);
        this.setState({ currentPage: pagenum });
    }

    handleLike = (id) => {
        likeMovie(id);
        //TODO
        //this.setState({ movies: getMovies() });
    }

    handleDelete = async (id) => {
        const originalMovies = this.state.movies;
        console.log("deleting", id);
        const movies = originalMovies.filter(m => m._id !== id);
        this.setState({ movies });
        try {
            await deleteMovie(id);
        } catch ({ error, expectedError }) {
            console.log("exception", error.response, "expectedError", expectedError);
            if (expectedError)
                toast.error(error.response.data);
        }
        // catch (ex) {
        //     if (ex.response && ex.response.status === 404)
        //         toast.error("Movie is already deleted");

        //     this.setState({ movies: originalMovies });
        // }
    }

    handleGenreSelect = (genre) => {
        console.log("genre selected", genre);
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    handleSearch = (searchQuery) => {
        //const searchQuery = input.toLowerCase();
        // console.log(searchQuery);
        // //this.setState({searchQuery});
        // const movies = getMovies();
        // const filtered = movies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery));
        // console.log(filtered);
        this.setState({ searchQuery, selectedGenre: this.state.defaultGenre, currentPage: 1 });

    }
}

export default Movies;