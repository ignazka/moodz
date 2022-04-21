const mongoose = require('mongoose')

const { MONGO_URL } = process.env

async function connectDB() {
  try {
    const { connection } = await mongoose.connect(MONGO_URL)
    console.log(`Connection to ${connection.name} established`)
  } catch (error) {
    console.log(`Connection to mongoDB failed: ${error.message}`)
  }
}
module.exports = connectDB
