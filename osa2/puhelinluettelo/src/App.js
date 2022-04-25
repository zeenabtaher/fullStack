import { useState, useEffect } from 'react'
import personService from './services/persons'
import './app.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [ilmoitus, setIlmoitus] = useState(null)

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
        .then(() =>{
          setIlmoitus(`Henkilön ${newName} puhelinnumero on päivitetty`)
          setTimeout(() => {
            setIlmoitus(null)
          }, 5000)
        })
      }
    }
    
    else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      .then(ilmoitus => {
        setIlmoitus(`Henkilö ${newName} on lisätty puhelinluetteloon`)
        setTimeout(() => {
          setIlmoitus(null)
        }, 5000)
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
    .catch(error => {
      alert(`${newName} on jo ehditty poistamaan pavelimelta`)
      setPersons(persons.filter(n => n.id !== id))
    })
    .then(ilmoitus => {
      setIlmoitus(`Henkilö ${person.nimi} on poistettu`)
      setTimeout(() => {
        setIlmoitus(null)
      }, 5000)
    })
   }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
        <Notification message={ilmoitus}/>

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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes("error")){
    return(
      <div className='virhe'>
          {message}
      </div>
    )
  }
  else{
    return (
      <div className='ilmoitus'>
        {message}
      </div>
    )
  }
  
}

export default App;