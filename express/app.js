const app = require('express')()
const { connectDB, middlewares, sessionConfig } = require('./config')
const { PORT } = process.env
async function start() {
  try {
    await connectDB()
    middlewares(app)
    sessionConfig(app)

    app.get('/', (req, res) => {
      res.status(200).json({ message: 'running' })
    })
    app.listen(PORT, () => console.log(`Server running at ${PORT}`))
  } catch (error) {
    console.log(`Starting express server failed: ${error.message}`)
  }
}

module.exports = start
