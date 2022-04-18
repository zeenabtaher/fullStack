import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  //tapahtuman käsittelijä uudelle nimelle
  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //tapahtuman käsittelijä uudelle numerolle
  const handeleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  //tapahtuman käsittelijä hakukentälle
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {

    event.preventDefault()
    const personObject = {
      nimi: newName,
      numero: newNumber,
      id: persons.length +1,
    }

    if ((persons.some((person) => person.nimi === newName))){
      console.log('toimii')
      window.alert(`${newName} on jo puhelinluettelossa`)
    }
    
    else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
       //setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }  

  const filtteri = persons.filter(persons => persons.nimi.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      
          <Filter onChange={handleFilter}/>

        <h2>Lisää uusi henkilö</h2>
        <PersonForm onSubmit={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        nameChange = {handleNewName}
        numberChange = {handeleNewNumber}/>
        
      <h2>Numbers</h2>
      <Persons filtteri={filtteri} persons={persons}/>
    </div>
  )
}

const Persons = ({filtteri}) => {
return(
  <div>
    {filtteri.map(persons =>
    <p key={persons.id}>
      {persons.nimi} {persons.numero}
    </p>
   )}
  </div>
)}

const Filter = ({onChange}) => {
return(
  <div>
   etsi luettelosta: <input onChange={onChange}/>
  </div>
)}

const PersonForm = ({onSubmit, newName, newNumber, nameChange, numberChange}) => {
return(
  <form onSubmit={onSubmit}> 
    <div>
      nimi: <input value={newName} onChange={nameChange}/>
    </div>
    <div>
      puhelinnumero: <input value={newNumber} onChange={numberChange}/>
    </div>
    <div>
          <button type="submit">lisää</button>
        </div>
  </form>
)
}
export default App;