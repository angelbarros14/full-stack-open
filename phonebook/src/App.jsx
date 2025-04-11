import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addInfo = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: Number(persons.length + 1)
    }

    const found = persons.find((name) => name.name.trim().toLowerCase() === newName.trim().toLowerCase())
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return false
    } 

    if (newName == '') {
      alert('Please enter a name')
      return false
    }

    console.log('before', persons)
    setPersons(prev => prev.concat(nameObject))
    setNewName('')
    setNewNumber('')
    // delay on printing updated state
    console.log('after', persons)
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addInfo}>
        <div> name: <input value={newName} onChange={handleName} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumber}/> </div>
        <div> 
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.id}> {person.name} {person.number}</div>)}
    </div>
  )
}

export default App