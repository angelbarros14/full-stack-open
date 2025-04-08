const Total = (props) => {
    const exercises = props.parts.map(part => part.exercises)
    let total = 0
    exercises.forEach(exercise => {
        total += exercise
    })

    return (
        <p>Number of exercises {total}</p>
    )
}

export default Total