const session = require('express-session')
const MongoStore = require('connect-mongo')
const { NODE_ENV, MONGO_URL, SESSION_SECRET } = process.env

function sessionConfig(app) {
  const isProduction = NODE_ENV === 'production'
  const sameSite = isProduction ? 'none' : 'lax'
  app.set('trust proxy', 1)
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URL,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite,
        secure: isProduction,
      },
    })
  )
}

module.exports = sessionConfig
