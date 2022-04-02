import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => {
const all = good + neutral + bad
const average = (good + neutral + bad) / 3
const positive = good / (neutral + bad)*100

if (all == 0){
  return (
    <div>
      No feefback given
    </div>
  )
}
  return(
    <div>
      <StatisticLine text = "Good" value = {good}/>
      <StatisticLine text = "Neutral" value = {neutral}/>
      <StatisticLine text = "Right" value = {bad}/>
      <StatisticLine text = "All" value = {all}/>
      <StatisticLine text = "Average" value = {average}/>
      <StatisticLine text = "Positive" value = {positive}/>
    </div>
  )
}

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [left, setGood] = useState(0) //tilojen(hookien) left ja righ alustus alkuarvolla 0:lla
  const [midle, setNeutral] = useState(0)
  const [right, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick = {() => setGood(left + 1)} text = "good" />
        <Button handleClick={() => setNeutral(midle + 1)} text = "neutral" />
        <Button handleClick= {() => setBad(right + 1)} text = "bad" />
        <h2>Statistics</h2>
        <Statistics good = {left} neutral = {midle} bad= {right}/>
      </div> 
    </div>
  )

}

export default App;
