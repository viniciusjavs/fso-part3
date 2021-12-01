import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import Person from './models/person.js'

const app = express()

app.use(cors())
app.use(json())

morgan.token('body', ({ body }, _res) => JSON.stringify(body))
const tiny = `:method :url :status :res[content-length] - :response-time ms`
app.use(morgan(`${tiny} :body`))

app.use(express.static('build'))

app.get('/api/persons', (_request, response) => {
    Person
        .find({})
        .then(persons => response.json(persons))
})

app.get('/info', (_request, response) => {
    Person
        .estimatedDocumentCount()
        .then(numPersons => { response.send(`
            <p>Phonebook has info for ${numPersons} people</p>
            ${Date()}
            `)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => person ? response.json(person) : next(new Error('id not found')))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => result ? response.status(204).end() : next(new Error('id not found')))
        .catch(error => next(error))
})

app.post('/api/persons', ({ body }, response, next) => {
    const person = new Person({...body})
    person
        .save()
        .then(savedPerson => response.json(person))
        .catch(error => next(error))
})

app.put('/api/persons/:id', ({ body: {name, number}, params: {id} }, response, next) => {
    const person = {name, number}
    console.log('put ', person, id)
    Person
        .findByIdAndUpdate(id, person, { new: true })
        .then(updatedPerson => updatedPerson ? response.json(updatedPerson) : next(new Error('id not found')))
        .catch(error => next(error))
})

const unknownEndpoint = (_req, res) => res.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
    console.log(error)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    } else if (error.message === 'id not found') {
        return res.status(404).send({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

dotenv.config()
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
