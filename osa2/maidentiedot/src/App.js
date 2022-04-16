import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [maat, setMaat] = useState([])
  const [nautettavat, setNaytettavat] = useState([])
  const [haku, setHaku] = useState('')

  //tapahtuman käsittelijä
  const handleHaku = (event) => {
    const maa = event.target.value
    setHaku(maa)
    setNaytettavat(maat.filter( (maat) => maat.name.common.toLowerCase().includes(maa.toLowerCase())))
  }

  //datan hakeminen
  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setMaat(response.data)
    })
  }, [])
 
  
  return (
    <div>
      <Hae value= {haku} onChange={handleHaku}/> 
      <h2>
        Tulokset
      </h2>
      {nautettavat.length > 10 ? (
        <p>Liikaa osumia, tarkenna hakua</p>
      ): (
        <Maat nautettavat={nautettavat} />
      )}
      {nautettavat.length === 1 ? (
        <Sisalto tieto={nautettavat[0]}/>
      ): null}
      
    </div>
    
  );
}

const Sisalto = ({tieto}) => {
  return(
    <div>
      <h1>{tieto.name.common}</h1>
      <p>pääkaupunki: {tieto.capital}</p>
      <p>pinta-ala (km^2): {tieto.area}</p>
     <h3>Kielet:</h3>
      <ul>
        {Object.values(tieto.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h3>Maan lippu</h3>
      <img src={tieto.flags.png} alt={tieto.name.common}/>
    </div>
  )
}
const Hae = ({onChange}) => {
return(
  <div>
    etsi maan nimellä: <input onChange={onChange}/>
  </div>
)
}

const Maat = ({nautettavat}) => {
 return(
   <div>
     {nautettavat.map(maat =>
      <p key={maat.name.official} >
        {maat.name.common}
      </p>)}
   </div>
 )
}
export default App;
