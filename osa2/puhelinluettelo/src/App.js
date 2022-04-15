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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          etsi luettelosta: <input onChange={handleFilter}/>
        </div>
        <h2>Lisää uusi henkilö</h2>
        <div>
          nimi: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          puhelinnumero: <input value={newNumber} onChange={handeleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*persons.map(persons =>
       <p key={persons.id}>
        {persons.nimi}   {persons.numero}
      </p>)*/}
       {filtteri.map(persons =>
        <p key={persons.id}> 
        {persons.nimi} {persons.numero}
        </p>)}
    </div>
  )
}
export default App;
