const User = require('./user.model')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

function validationError(error) {
  return error instanceof mongoose.Error.ValidationError
}

function isMongoError(error) {
  return error.code === 11000
}

async function signup(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
        .end()
    }
    const userExists = await User.findOne({ email }).lean()
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' }).end()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      email,
      password: hashedPassword,
    })
    const userWithoutPassword = { email: user.email, _id: user._id }

    // req.session.user = userWithoutPassword

    return res.status(200).json(userWithoutPassword)
  } catch (error) {
    if (validationError(error)) {
      return res.status(400).json({ message: error.message }).end()
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: error.message }).end()
    }
    return res.status(500).json({ message: error.message }).end()
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email/Username and password are required' })
        .end()
    }
    const user = await User.findOne({ email }).lean()

    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found, please signup' })
        .end()
    }

    const hasCorrectPassword = await bcrypt.compare(password, user?.password)

    if (hasCorrectPassword) {
      const userWithoutPass = { email: user?.email, _id: user?._id }
      // req.session.user = userWithoutPass
      return res.status(200).json(userWithoutPass)
    }
  } catch (error) {
    if (validationError(error)) {
      return res.status(400).json({ message: error.message }).end()
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: error.message }).end()
    }
    return res.status(500).json({ message: error.message }).end()
  }
}

async function logout(req, res) {
  try {
    await req.session.destroy()
    return res.status(200).json({ message: 'logout' })
  } catch (err) {
    res.status(500).json({ error: err.messages })
  }
}

async function getLoggedInUser(req, res) {
  try {
    const user = req.session.user
    if (!user) {
      return res.status(400).json(null)
    }
    res.status(200).json(user)
  } catch (err) {}
}

module.exports = { signup, login, logout, getLoggedInUser }
