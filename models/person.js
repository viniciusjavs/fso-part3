import mongoose from 'mongoose'
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
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person