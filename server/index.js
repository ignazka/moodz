const app = require('express')()
const { connectDB, middlewares, sessionConfig } = require('./config')
const authRouter = require('./modules/auth')
const next = require('next')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config

nextApp.prepare().then(() => {
  // express code here
  connectDB()
  middlewares(app)
  //   sessionConfig(app)
  authRouter(app)

  app.get('*', (req, res) => {
    return handle(req, res) // for all the react stuff
  })
  app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`ready at http://localhost:${PORT}`)
  })
})
