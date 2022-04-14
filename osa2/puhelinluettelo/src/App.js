import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { nimi: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  //tapahtuman käsittelijä
  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      nimi: newName,
      id: persons.length +1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons =>
       <p  key={persons.id}>
        {persons.nimi}
       </p>)}
    </div>
  )

}
export default App;
