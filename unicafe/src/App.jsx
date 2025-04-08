import { useState } from 'react'
import Button from './Button'
import Result from './Result'
import Header from './Header'

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const setValueGood = newValue => () => {
    console.log('value good', newValue)
    setGood(newValue)
  }

  const setValueNeutral = newValue => () => {
    console.log('value neutral', newValue)
    setNeutral(newValue)
  }

  const setValueBad = newValue => () => {
    console.log('value bad', newValue)
    setBad(newValue)
  }


  return (
    <>
      <Header header='Give Feedback'/>
      <Button onClick={setValueGood(good + 1)} text='good' />
      <Button onClick={setValueNeutral(neutral + 1)} text='neutral' />
      <Button onClick={setValueBad(bad + 1)} text='bad' />
      <Header header='Statistics' />
      <Result text='good' result={good}/>
      <Result text='neutral' result={neutral}/>
      <Result text='bad' result={bad}/>
    </>
  )
}

export default App