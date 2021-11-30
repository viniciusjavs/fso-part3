import express, { json } from 'express'
import morgan from 'morgan'

const app = express()

app.use(json())

morgan.token('body', ({ body }, _res) => JSON.stringify(body))

const tiny = `:method :url :status :res[content-length] - :response-time ms`

app.use(morgan(`${tiny} :body`))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (_request, response) => response.json(persons))

app.get('/info', (_request, response) => response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    ${Date()}
`))

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(({ id }) => id === Number(request.params.id))
    person
        ? response.json(person)
        : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(({ id }) => id !== Number(request.params.id))
    response.status(204).end()
})

const generateId = () => {
    const maxRange = 96
    return Math.floor(Math.random() * maxRange)
}

app.post('/api/persons', ({ body }, response) => {
    const badRequest = error => response.status(400).json({'error': error})
    const {name, number} = body

    if (!name)
        return badRequest('Name is missing')
    if (!number)
        return badRequest('Number is missing')
    if (persons.some(p => p.name === name))
        return badRequest('Name must be unique')

    const person = {id: generateId(), ...body}
    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (_req, res) => res.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})