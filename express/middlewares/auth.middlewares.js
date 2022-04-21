function isLoggedIn(req, res, next) {
  const user = req.session.user
  if (user) {
    return next()
  }
  res.status(400).json({ message: 'Access denied. Please login' })
}

function isNotLoggedIn(req, res, next) {
  const user = req.session.user
  if (!user) {
    return next()
  }
  res.status(400).json({ message: `Please logout to have access` })
}

module.exports = { isLoggedIn, isNotLoggedIn }
