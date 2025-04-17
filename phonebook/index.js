const express = require('express')
const app = express()

app.use(express.json())

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

    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
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

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)