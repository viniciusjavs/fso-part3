import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import dotenv from 'dotenv'

dotenv.config()

let url = process.env.MONGODB_URI
console.log('connecting to', url)
url = url.replace('MONGODB_PASS', process.env.MONGODB_PASS)

mongoose
    .connect(url)
    .then(res => console.log('connected to MongoDB'))
    .catch(({ message }) => console.log('error connecting to MongoDB: ', message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 9,
        maxlength: 11,
        required: true,
        match: /^[0-9]{3}-[0-9]{5,7}$/
    }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person