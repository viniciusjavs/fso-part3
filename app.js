const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const { infoRouter, personsRouter } = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI.replace('MONGODB_PASS', config.MONGODB_PASS))
  .then(() => console.log('connected to MongoDB'))
  .catch(({ message }) => console.log('error connecting to MongoDB: ', message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/info', infoRouter)
app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app