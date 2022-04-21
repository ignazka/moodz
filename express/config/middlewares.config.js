const express = require('express')
const cors = require('cors')

const { ORIGIN } = process.env

function middlewares(app) {
  try {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({ credentials: true, origin: ORIGIN }))
  } catch (error) {
    console.log(`Error in middlewares: ${error.message}`)
  }
}

module.exports = middlewares
