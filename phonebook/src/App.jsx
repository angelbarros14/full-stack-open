import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas', id: 1}
  ])
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const listPersons = [...persons]
    const nameObject = {
      name: newName,
      id: Number(listPersons.length + 1)
    }

    const found = listPersons.find((name) => name.name == newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      return false
    } 

    console.log(nameObject)
    listPersons.push(nameObject)
    setPersons(listPersons)
    console.log(listPersons)
    setNewName('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName}  
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App