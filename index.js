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
        .find({})
        .then(persons => { response.send(`
            <p>Phonebook has info for ${persons.length} people</p>
            ${Date()}
            `)
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => response.json(person))
        .catch(_error => response.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(({ id }) => id !== Number(request.params.id))
    response.status(204).end()
})

app.post('/api/persons', ({ body }, response) => {
    const badRequest = error => response.status(400).json({'error': error})
    const {name, number} = body

    if (!name)
        return badRequest('Name is missing')
    if (!number)
        return badRequest('Number is missing')

    const person = new Person({...body})
    person
        .save()
        .then(savedPerson => response.json(person))
})

const unknownEndpoint = (_req, res) => res.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint)

dotenv.config()
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})