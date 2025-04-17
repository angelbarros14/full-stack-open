const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
      {
        id: "7fd1",
        name: "Angel",
        number: "1"
      },
      {
        id: "2c01",
        name: "Skeleton",
        number: "2"
      }
    ]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(n => n.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(n => n.id !== id )

    response.status(204).end()
})

const randomId = (max) => {
    return Math.floor(Math.random() * max)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    // n.name access persons array
    // body.name access recent input
    const name = persons.find(n => n.name === body.name)

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'input missing'
        })
    }

    // if there is an existing name
    if(name) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } 
    
    const person = {
        id: randomId(500),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)