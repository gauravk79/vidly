import http from './httpService';
import { apiEndpoint } from '../config.json';

const userEndpoint = apiEndpoint + '/users';
const authEndpoint = apiEndpoint + '/auth';

export function registerUser(user) {
    return http.post(userEndpoint,
        {
            email: user.username,
            password: user.password,
            name: user.name
        });
}