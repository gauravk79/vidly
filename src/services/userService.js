import http from './httpService';

const userEndpoint = '/users';

export function registerUser(user) {
    return http.post(userEndpoint,
        {
            email: user.username,
            password: user.password,
            name: user.name
        });
}