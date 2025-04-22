require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('---')
    next()
}

morgan.token('body', function getBody (request) {
    return JSON.stringify(request.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// let persons = [
//       {
//         id: "7fd1",
//         name: "Angel",
//         number: "1"
//       },
//       {
//         id: "2c01",
//         name: "Skeleton",
//         number: "2"
//       }
//     ]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response, next) => {
    const date = new Date()

    Person.countDocuments({})
    .then(count => {
        response.send(
            `<p>Phonebook has info for ${count} people</p>
            <p>${date}</p>`
        )
    })
    .catch(error => next(error))
    
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
    // const id = request.params.id
    // const person = persons.find(n => n.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
        // console.log(result)
    })
    .catch(error => next(error))

    // const id = request.params.id
    // persons = persons.filter(n => n.id !== id )

    // response.status(204).end()
})

const randomId = (max) => {
    return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedInfo => {
        response.json(savedInfo)
    })

    // // n.name access persons array
    // // body.name access recent input
    // const name = persons.find(n => n.name === body.name)

    // if(!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: 'input missing'
    //     })
    // }

    // // if there is an existing name
    // if(name) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // } 
    
    // const person = {
    //     id: randomId(500),
    //     name: body.name,
    //     number: body.number,
    // }

    // persons = persons.concat(person)
    // console.log(persons)
    // response.json(person)

})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id) 
    .then(person => {
        if (!person) {
            return response.status(404).end()
        }
    
    person.name = name
    person.number = number

    return person.save().then((updatedInfo) => {
        response.json(updatedInfo)
    })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)
})
