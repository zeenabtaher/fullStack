import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [etsiNimi, setFilter] = useState('')
  const [ilmoitus, setIlmoitus] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

 
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      nimi: newName,
      numero: newNumber,
      id: persons.length + 1,
    }

    if (personObject.nimi.length < 3) {
      setIlmoitus(
        `error: Nimen tulee olla vähintään kolme merkkiä pitkä`
      )
      setTimeout(() => {
        setIlmoitus(null)
      }, 5000)
      return
    }
    if (personObject.numero.length < 8) {
      setIlmoitus(
        `error: Numeron tulee olla vähintään kymmenen merkkiä pitkä`
      )
      setTimeout(() => {
        setIlmoitus(null)
      }, 5000)
      return
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
        .catch(error => {
          alert(
            `Henkilö '${newName}' on jo ehditty poistamaan palvelimelta`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
        .then(() =>{
          setIlmoitus(`Henkilön ${newName} puhelinnumero on päivitetty`)
          setTimeout(() => {
            setIlmoitus(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
        return;
      }
    }
    
    else {
      setPersons(persons.concat(personObject))
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
       .catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        console.log(error.response.data)
      })
    }
    setNewName('')
    setNewNumber('')
  }  

  console.log(persons)

  const poista = (id) => {
    
    const person = persons.find((p) => p.id === id)
    const tulos = window.confirm(`Haluatko varmasti poistaa ${person.nimi}`)
    
    if (tulos === true){
     personService
     .poista(id)
     .then(() => {
       //setPersons(persons.filter((person) => person.id !== id))
       const uusi = persons.filter((person) => person.id !== id);
        setPersons(uusi);
     })
     /*
     .catch(error => {
       alert(`${newName} on jo ehditty poistamaan pavelimelta`)
       setPersons(persons.filter(n => n.id !== id))
     })*/
     .then(ilmoitus => {
       setIlmoitus(`Henkilö ${person.nimi} on poistettu`)
       setTimeout(() => {
         setIlmoitus(null)
       }, 5000)
     })
    }
   }
  
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

  
  
 const filtteri = persons.filter(person => person.nimi.toLowerCase().includes(etsiNimi.toLowerCase()))
 console.log(filtteri)


  return (
    <div>
      <h2>Puhelinluettelo</h2>
        <Notification message={ilmoitus}/>

        <Filter onChange={handleFilter}/>

        <h2>Lisää uusi henkilö</h2>
        <PersonForm onSubmit={addPerson} 
        newName = {newName} 
        newNumber = {newNumber}
        nameChange = {handleNewName}
        numberChange = {handeleNewNumber}/>
        
      <h2>Numbers</h2>
      <Persons filtteri={filtteri} persons={persons} poista={poista}/>
    </div>
  )
}


export default App;