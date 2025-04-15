import { useEffect, useState } from 'react'
import Header from './component/Header'
import Notification from './component/Notification'
import service from './services/phonebook'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessage ] = useState(null)

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
    
    if (newName === '') {
      alert('Please enter a name')
      return false
    }

    const existing = existingName(newName, persons)
    if (existing) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber(existing, newName)
      } else {
        reset()
        return false
      }
    } else {
      addName(nameObject, newName)
    }
  }

  // add a function that checks if the name exist
  const existingName = (newName, persons) => {
    return persons.find((person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase())
  }

  // add a function that confirms and update the existing number
  const updateNumber = (person, name) => {
    const id = person.id
    const changedInfo = {...person, number: newNumber}

    service 
    .updateNumber(id, changedInfo, name)
    .then(returnedNumber => {
      setPersons(persons.map(person => person.id === id ? returnedNumber : person ))
      reset()
      setMessage(`Updated ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  // add a function that adds a new person to the list
  const addName = (nameObject, name) => {
    service
    .create(nameObject)
    .then(returnedName => {
      setPersons(prev => prev.concat(returnedName))
      reset()
      setMessage(`Added ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const reset = () => {
    setNewName('')
    setNewNumber('')
  }

  const deleteInfo = (id, name) => {
    // console.log('deleted')
    if (confirm(`Delete ${name}?`)) {
      service
      .deleteName(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id))
      setMessage(`Deleted ${name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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

  const filter = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase().trim()))

  return (
    <div>
      <Header text='Phonebook' />
      <Notification message={message} />
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