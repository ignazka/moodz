const connectDB = require('./db.config')
const middlewares = require('./middlewares.config')
const sessionConfig = require('./session.config')

module.exports = { connectDB, middlewares, sessionConfig }
