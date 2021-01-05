import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => Array(6).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const changeSelected = () => {  
    
    setSelected(Math.floor(Math.random() * 6))
  }
  const updateVote = () => {
    
    const copy = [...votes]
    copy[selected]+=1
    setVotes(copy)
    setMostVotes(votes.indexOf(Math.max(...votes))) 
    
  }
  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  return (
    <div>
      
      <p><b>Anecdote of the day</b></p>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} points</p>
      <p><Button handleClick = {updateVote} text = {"Vote"}/></p>
      <Button handleClick = {changeSelected} text = {"Next anecdote"}/>
      
      <p><b>Anecdote with most votes</b></p>
      <p>{props.anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} points</p>
    </div>
    
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
