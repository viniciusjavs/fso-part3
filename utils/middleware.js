
const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', ({ body }) => JSON.stringify(body))
const tiny = ':method :url :status :res[content-length] - :response-time ms'
const requestLogger = morgan(`${tiny} :body`)

const unknownEndpoint = (_req, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, _req, res, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.message === 'id not found') {
    return res.status(404).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}