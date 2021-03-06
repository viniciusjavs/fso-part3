require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_PASS,
  MONGODB_URI
}