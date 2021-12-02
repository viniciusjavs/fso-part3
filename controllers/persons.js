const personsRouter = require('express').Router()
const infoRouter = require('express').Router()
const Person = require('../models/person')

infoRouter.get('/', (_request, response) => {
  Person
    .estimatedDocumentCount()
    .then(numPersons => { response.send(`
            <p>Phonebook has info for ${numPersons} people</p>
            ${Date()}
            `)
    })
})

personsRouter.get('/', (_request, response) => {
  Person
    .find({})
    .then(persons => response.json(persons))
})

personsRouter.get('/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => person ? response.json(person) : next(new Error('id not found')))
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => result ? response.status(204).end() : next(new Error('id not found')))
    .catch(error => next(error))
})

personsRouter.post('/', ({ body }, response, next) => {
  const person = new Person({ ...body })
  person
    .save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

personsRouter.put('/:id', ({ body: { name, number }, params: { id } }, response, next) => {
  const person = { name, number }
  console.log('put ', person, id)
  Person
    .findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then(updatedPerson => updatedPerson ? response.json(updatedPerson) : next(new Error('id not found')))
    .catch(error => next(error))
})

module.exports = {
  infoRouter,
  personsRouter
}