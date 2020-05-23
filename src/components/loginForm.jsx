import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {

    state = {
        data: {
            username: '',
            password: ''
        },
        errors: {
            username: '',
            password: ''
        }
    };

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).required().label("Username"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label("Password")
    };

    doSubmit = async () => {
        //call the server
        try {
            const { data: user } = this.state;
            await auth.loginUser(user.username, user.password);
            toast("User Login Successful");
            const { state } = this.props.location;            
            window.location = state ? state.from.pathname : '/';
        } catch ({ error, expectedError }) {
            if (expectedError) {
                toast.error(error.response.data);
                const err = { ...this.state.errors };
                err.password = error.response.data;
                this.setState({ errors: err });
            }
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", true)}
                    {this.renderInput("password", "Password", false, "password")}
                    {this.renderButton("Login")}
                </form>
            </div>);
    }
}

export default LoginForm;