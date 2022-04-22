const bodyParser = require('body-parser')
const cors = require('cors')

const { ORIGIN } = process.env

function middlewares(app) {
  try {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors({ credentials: true, origin: ORIGIN }))
  } catch (error) {
    console.log(`Error in middlewares: ${error.message}`)
  }
}

module.exports = middlewares
