import { useState } from 'react'
import Button from './Button'
import Header from './Header'
import Statistics from './Statistics'

const StatisticsLine = ({ good, neutral, bad }) => {
  let sum = good + bad + neutral
  if (sum === 0) {
    return (
      <p>No feedback given.</p>
    )
  }
  return (
    <>
    <table>
      <Statistics text='good' result={good}/>
      <Statistics text='neutral' result={neutral}/>
      <Statistics text='bad' result={bad}/>
      <Statistics text='average' result={((good * 1) + (neutral * 0) + (bad * -1)) / sum}/>
      <Statistics text='positive' result={`${(good / sum) * 100}%`}/>
    </table>
    </>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <>
      <Header header='Give Feedback'/>
      <Button onClick={() => setGood (good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Header header='Statistics' />
      <StatisticsLine good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App