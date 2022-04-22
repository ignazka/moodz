const router = require('express').Router()
const controllers = require('./auth.controllers')
// const middlewares = require('../../middlewares')

const ROUTES = {
  signup: '/signup',
  login: '/login',
  logout: '/logout',
  isLoggedIn: '/login',
}

// this function recieves the app instance and attaches the auth routes to the router
// the signup and login controllers should only run if there is no user logged in
// the logout and isLoggedIn controllers should only run if there is a user in the session
function authRouter(app) {
  router
    .post(ROUTES.signup, controllers.signup)
    .post(ROUTES.login, controllers.login)
    .post(ROUTES.logout, controllers.logout)
    .get(ROUTES.isLoggedIn, controllers.getLoggedInUser)

  app.use('/moodz_api', router)
}

module.exports = authRouter
