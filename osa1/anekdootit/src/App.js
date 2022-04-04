import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const pisteet = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(pisteet)

  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const mostPoints = () => {
    let suurin = 0;
    let suurinIdx = 0;
    for(let i=0; i<anecdotes.length; i++) {
      if (suurin < votes[i]) {
        suurin = votes[i];
        suurinIdx = i;
      }
    }
    return suurinIdx
  }

  return (
    <div>
      <h1>Päivän anekdootti</h1>
       {anecdotes[selected]}
      <br />
        has {votes[selected]} votes
      <br />
      <Button handleClick={() => setSelected(Math.floor( Math.random() * anecdotes.length))} text= "next anecdote" />
      <Button handleClick={() => voteForAnecdote()} text = "vote!"/>
      <h2>Eniten ääniä saanut anekdootti</h2>
      {anecdotes[mostPoints()]}
    </div>
  )
}

export default App