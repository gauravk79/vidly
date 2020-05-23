import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovie, saveMovie, getMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';

import Form from './common/form';
import Joi from 'joi-browser';

class MovieForm extends Form {

    state = {
        genres: [],
        notfound: false,
        data: {
            title: '',
            genre: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        errors: {},
        movieid: ''
    }

    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
    };

    doSubmit = async () => {
        //call the server     
        const movie = { ...this.state.data };
        movie.genre = this.getGenreByName(movie.genre);
        movie._id = this.state.movieid;
        console.log("movie data", this.state.data);
        try {
            const { data, status } = await saveMovie(movie);
            if (status === 200) {
                console.log("Movie Saved", data);
                if (this.state.movieid)
                    toast("Movie Updated Successfully");
                else
                    toast("Movie Created Successfully");
            } else {
                console.log(data, status);
            }
            this.props.history.push("/movies");

        } catch ({ error, expectedError }) {
            console.log("exception", error.response, "expectedError", expectedError);
            if (expectedError)
                toast.error(error.response.data);
        }
    }

    getGenreByName = (name) => {
        return this.state.genres.find(g => g.name === name);
    }

    async populateGenres() {
        const { data: genres } = await getGenres();
        console.log("genreList", genres);
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === "new") return;
            const { data: movie } = await getMovie(this.props.match.params.id);
            console.log("fetched", movie);
            const data = {
                "title": movie['title'],
                "genre": movie['genre']['name'],
                "numberInStock": movie['numberInStock'],
                "dailyRentalRate": movie['dailyRentalRate']
            };
            const movieid = movie._id;
            this.setState({ data, movieid });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.setState({ notfound: true });
        }
    }

    async componentDidMount() {
        await this.populateMovie();
        await this.populateGenres();
    }

    render() {        
        const genreList = this.state.genres.map(g => g.name);
        console.log("notfound", this.state.notfound);
        return (
            (this.state.notfound === true) ?
                <Redirect to="/not-found" /> :
                // <div>
                //     <h1>Movie Details - {this.props.match.params.id} </h1>
                //     <button className="btn btn-primary" onClick={() => this.props.history.push("/movies")}>Save</button>
                // </div>
                <div>
                    <h1>Movie Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput("title", "Title", true)}
                        {this.renderSelect("genre", "Genre", genreList)}
                        {this.renderInput("numberInStock", "Number in Stock")}
                        {this.renderInput("dailyRentalRate", "Rate")}
                        {this.renderButton("Save")}
                    </form>
                </div>

        );
    }
}

export default MovieForm;
