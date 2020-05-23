import jwtDecode from 'jwt-decode';
import http from './httpService';


const authEndpoint = '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

export async function loginUser(email, password) {
    const { data: jwt } = await http.post(authEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginUserWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logoutUser() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (ex) { 
          return null;
      }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    loginUser, 
    logoutUser, 
    getCurrentUser, 
    loginUserWithJwt
}