import { useState } from 'react'
import Button from './Button'
import Header from './Header'
import Statistics from './Statistics'

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const setValueGood = newValue => () => {
    // console.log('value good', newValue)
    setGood(newValue)
  }

  const setValueNeutral = newValue => () => {
    // console.log('value neutral', newValue)
    setNeutral(newValue)
  }

  const setValueBad = newValue => () => {
    // console.log('value bad', newValue)
    setBad(newValue)
  }

  let sum = good + bad + neutral
  const average = sum == 0 ? 0 : ((good * 1) + (neutral * 0) + (bad * -1)) / sum
  const positive = sum == 0 ? 0: `${(good / sum) * 100}%`

  return (
    <>
      <Header header='Give Feedback'/>
      <Button onClick={setValueGood(good + 1)} text='good' />
      <Button onClick={setValueNeutral(neutral + 1)} text='neutral' />
      <Button onClick={setValueBad(bad + 1)} text='bad' />
      <Header header='Statistics' />
      <Statistics text='good' result={good}/>
      <Statistics text='neutral' result={neutral}/>
      <Statistics text='bad' result={bad}/>
      <Statistics text='average' result={average}/>
      <Statistics text='positive' result={positive}/>
    </>
  )
}

export default App