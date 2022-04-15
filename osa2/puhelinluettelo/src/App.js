import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { nimi: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //tapahtuman käsittelijä uudelle nimelle
  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //tapahtuman käsittelijä uudelle numerolle
  const handeleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
      {persons.map(persons =>
       <p key={persons.id}>
        {persons.nimi}   {persons.numero}
       </p>)}
    </div>
  )
}
export default App;
