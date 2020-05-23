import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

//axios.defaults.headers.common['x-auth-token'] = auth.getJwt();
export function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log("Unexpected error", error);
        logger.log(error);
        toast.error("An unexpected error occured.");
    }
    console.log("expectedError", expectedError);
    return Promise.reject({ error, expectedError });
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};