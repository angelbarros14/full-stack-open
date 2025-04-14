import { useEffect, useState } from 'react'
import Header from './component/Header'
import service from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    service
    .getAll()
    .then(initialNames => {
      setPersons(initialNames)
    })
  }, [])

  const addInfo = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
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

    service
    .create(nameObject)
    .then(returnedName => {
      setPersons(prev => prev.concat(returnedName))
      setNewName('')
      setNewNumber('')
    })
  }

  const deleteInfo = (id, name) => {
    // console.log('deleted')
    if (confirm(`Delete ${name}?`)) {
      service
      .deleteName(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      })
    } else {
      return false
    }
    
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  // access filter name:
    // show the list depending on the filtered name
    // access the persons list (?), and display the filtered names 
  const filter = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase().trim()))

  return (
    <div>
      <Header text='Phonebook' />
      <div>filter shown with <input value={filterName} onChange={handleFilter}/> </div>
      <Header text='Add new' />
      <form onSubmit={addInfo}>
        <div> name: <input value={newName} onChange={handleName} /> </div>
        <div> number: <input value={newNumber} onChange={handleNumber}/> </div>
        <div> 
          <button type='submit'>add</button>
        </div>
      </form>
      <Header text='Numbers' />
      
      {filter.map(person => <div key={person.id}> {person.name} {person.number}
        <button type='submit' onClick={() => deleteInfo(person.id, person.name)}>delete</button>
      </div>)}
    </div>
  )
}

export default App