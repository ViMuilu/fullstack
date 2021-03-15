import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filterform = (props) => (
  <form >
    Filter:<input value={props.newFilter}
      onChange={props.filter} />
  </form>
)
const Addform = (props) => (

  <form onSubmit={props.addName}>
    <div>
      name: <input
        value={props.newName}
        onChange={props.handleNameChange} />
    </div>
    <div>number: <input
      value={props.newNum}
      onChange={props.handleNumChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

)
const NameListForm = (props) => (
  <form >
    <div>
      {props.filter.map(person => <p key={person.name}>
        {person.name} {person.number} <button onClick ={() =>props.delName(person.name)}>Del</button></p>)}
    </div>
  </form>
)
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const updateNumber = (id, nameObj) => {
    personService
    .update(id,nameObj)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
    })
    setErrorMessage(
      `Changed number of ${nameObj.name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const addName = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName
      , number: newNum
    }
    if (persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} already exists do you want to change current number to a new number`)){
        const p = persons.find(p => p.name === newName)
        updateNumber(p.id, nameObj)
        
      }
    } else {
      personService
        .create(nameObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        setErrorMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    setNewNum('')
    setNewName('')
  }
  const delName = name => {

    const person = persons.find(p => p.name === name)
    if (window.confirm(`Delete${name}`)) {
      personService
        .del(person.id)
        .catch(error => {
          alert(
            `the'${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== persons.id))
        })
        setErrorMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }
  const filter = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}></Notification>
      <Filterform filter={handleFilter} newFilter={newFilter} />
      <h2>Add new</h2>
      <Addform addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNum={newNum} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <NameListForm filter={filter} delName = {delName}/>

    </div>
  )

}

export default App
