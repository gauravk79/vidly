import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { saveMovie } from '../services/movieService';
import { getGenres, genres } from '../services/genreService';

class NewMovieForm extends Form {
    state = {
        genres: [],
        data: {
            title: '',
            genre: '',
            numberInStock: 0,
            dailyRentalRate: 0 
        },
        errors: {}
    };

    schema = {
        title: Joi.string().required().label("Title"),
        genre: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate")
    };

    async componentDidMount() {
        const { data: genres } = await getGenres();
        //const genreList = [...genres];
        console.log("genreList", genres);
        this.setState({ genres });
    }

    doSubmit = async () => {
        //call the server     

        const movie = { ...this.state.data };
        movie.genre = this.getGenreByName(movie.genre);
        const promise = await saveMovie(movie);
        console.log("New Movie Submitted", promise);
        this.props.history.push("/movies");
    }

    // getGenreNames = async () => {
    //     const { data: genres.map(g => g.name) } = await getGenres();
    //     console.log("getGenreNames", genres.map(g => g.name).map(g => g.name));
    //     return ['', ...genres.map(g => g.name).map(g => g.name)];
    // };

    getGenreByName = (name) => {
        return this.state.genres.find(g => g.name === name);
    }

    render() {
        const genreList = this.state.genres.map(g => g.name);
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title", true)}
                    {this.renderSelect("genre", "Genre", genreList )}
                    {this.renderInput("numberInStock", "Number in Stock", false)}
                    {this.renderInput("dailyRentalRate", "Rate", false)}
                    {this.renderButton("Save")}
                </form>
            </div>);
    }
}

export default NewMovieForm;