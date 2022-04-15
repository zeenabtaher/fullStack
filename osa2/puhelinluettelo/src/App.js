import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { nimi: 'Arto Hellas', numero: '040-123456' },
    { nimi: 'Ada Lovelace', numero: '39-44-5323523' },
    { nimi: 'Dan Abramov', numero: '12-43-234345' },
    { nimi: 'Mary Poppendieck', numero: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    if ((persons.some((person) => person.nimi === newName))){
      console.log('toimii')
      window.alert(`${newName} on jo puhelinluettelossa`)
    }
    
    event.preventDefault()
    const personObject = {
      nimi: newName,
      numero: newNumber,
      id: persons.length +1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber(persons.concat(personObject))
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
