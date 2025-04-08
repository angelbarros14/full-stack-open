import Part from './Part'

const Content = (props) => {
    const result = props.parts.map((part, index) => {
      return <Part key={index} name={part.name} exercises={part.exercises}/>
    })
    return (
    <>
      {result}
    </>
      
    )
}

export default Content