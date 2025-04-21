const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://finchthefinch:${password}@cluster0.j8p8gbe.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person({
    name: newName,
    number: newNumber
})

if (process.argv.length == 5) {
    person.save().then(result => {
        console.log(`Added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
}

else if (process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
