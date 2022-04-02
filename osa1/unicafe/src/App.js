import { useState } from 'react'

const App = () => {
  const [left, setGood] = useState(0) //tilojen(hookien) left ja righ alustus alkuarvolla 0:lla
  const [midle, setNeutral] = useState(0)
  const [right, setBad] = useState(0)
  //const [allClicks, setAll] = useState([])

  const handleLeftClick = () =>{
    //setAll(allClicks.concat('Good'))
    setGood(left + 1)
  }

  const handleRightClick = () => {
    //setAll(allClicks.concat('Bad'))
    setBad( right +1)
  } 

  const handleMidleClick =() => {
    setNeutral(midle + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={handleLeftClick}>good</button>
        <button onClick={handleMidleClick}>neutral</button>
        <button onClick={handleRightClick}>bad</button>
        <h2>Statistics</h2>
        <p>Good {left}</p>
        <p>Neutral {midle}</p>
        <p>Bad {right}</p>
        <p>all {left + midle + right}</p>
        <p>average {(left + midle + right)/3}</p>
        <p>Positive {left / (midle+ right)*100} %</p>
      </div> 
    </div>
  )

}

export default App;
