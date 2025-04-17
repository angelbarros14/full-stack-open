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

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)