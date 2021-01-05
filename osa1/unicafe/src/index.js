import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = (props) =>{
  return (
        <tbody>
        <tr>
          <td>
            {props.text}
          </td>
          <td>
            {props.value}
          </td>
        </tr>
        </tbody>
    
  )
 
}
const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad) / all
  const pos =props.good/ all * 100    
  if(all === 0){
    return(
    <div>
    No feedback given
    </div>
    )
 
  } else {
    return (
    
    <div>
      <table>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={avg} />
      <StatisticLine text="positive" value ={pos +"%"} />
      </table>
    </div>
  )
    }

}
  
const App = () => {
  // tallenna napit omaan tilaansa
  const [clicks, setClicks] = useState({
    good: 0, bad: 0, neutral: 0
  })
  
  const handleNeutral = () => {
    const newClicks = { 
      neutral: clicks.neutral+ 1, 
      good: clicks.good,
      bad: clicks.bad
    }
    setClicks(newClicks)
  }
  const handleBad = () => {
    const newClicks = { 
      bad: clicks.bad+ 1,
      neutral: clicks.neutral , 
      good: clicks.good
      
    }
    setClicks(newClicks)
  }
  const handleGood = () => {
    const newClicks = { 
      good: clicks.good + 1,
      neutral: clicks.neutral, 
      bad: clicks.bad 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      <p><b>Feedback</b></p>
        <Button handleClick = {handleGood} text = {"good"}/>
        <Button handleClick = {handleNeutral} text = {"neutral"}/>
        <Button handleClick = {handleBad} text = {"bad"}/>
      <p><b>Statistics</b></p>
      <Statistics good = {clicks.good} neutral ={clicks.neutral} bad = {clicks.bad} />
    

      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
