import { api } from './api'

export function login(credentials: any) {
  return api.post('/login', credentials)
}

export function signup(credentials: any) {
  const { email, password } = credentials
  console.log(email, password)

  return api.post('/signup', credentials)
}

export function logout() {
  return api.post('/logout')
}

export function isLoggedIn() {
  return api.get('/login')
}
