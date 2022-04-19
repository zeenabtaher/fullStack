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
      const person = persons.find((persons) => persons.nimi === newName)
      const {id} = person
      const valinta = window.confirm(`${newName} on jo puhelinluettelossa, haluatko päivittää puhelinnumeroa?`)
      if (valinta === true){
        console.log('toimii')
        personService
        .update(person.id, personObject)
        .then((response) => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
      }
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
  
  const poista = (id) => {

   const person = persons.find((p) => p.id === id)
   const tulos = window.confirm(`Haluatko varmasti poistaa ${person.nimi}`)
   
   if (tulos === true){
    personService
    .poista(id)
    .then(() => {
      setPersons(persons.filter((person) => person.id !== id))
    })
   }
  }

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
      <Persons filtteri={filtteri} persons={persons} poista={poista}/>
    </div>
  )
}

const Persons = ({filtteri, poista}) => {
return(
  <div>
    {filtteri.map(persons =>
    <p key={persons.id}>
      {persons.nimi} {persons.numero}
      <button onClick={() => poista(persons.id)}>poista</button>
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