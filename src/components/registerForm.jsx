import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {
            username: '',
            password: '',
            name: ''        
        }
    };

    schema = {
        username: Joi.string().email({ minDomainAtoms: 2 }).required().label("Username"),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label("Password"),
        name: Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        //call the server     
        try {
            const {data, headers}  = await userService.registerUser({...this.state.data});
            console.log(data);            
            auth.loginUserWithJwt(headers['x-auth-token']);            
            window.location = '/';
            toast("User Registered Successfully");
        } catch ({error, expectedError}) {          
            if (expectedError)
               toast.error(error.response.data);
        }
    }

    render() {
        
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", true)}
                    {this.renderInput("password", "Password", false, "password")}
                    {this.renderInput("name", "Name")}                    
                    {this.renderButton("Register")}
                </form>
            </div>);
    }
}
 
export default RegisterForm;