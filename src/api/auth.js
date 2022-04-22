import { api } from './api';

export function login(credentials) {
  return api.post('/login', credentials);
}

export function signup(credentials) {
  return api.post('/signup', credentials);
}

export function logout() {
  return api.post('/logout');
}

export function isLoggedIn() {
  return api.get('/login');
}
