import React from 'react';
import auth from '../services/authService';

const Logout = () => {
    auth.logoutUser();
    return (
        window.location = '/'
    );
}

export default Logout;