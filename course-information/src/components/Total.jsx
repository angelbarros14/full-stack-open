const Total = ({ course }) => {
    let totalAmount = course.parts.reduce((sum, num) => sum + num.exercises, 0)
    console.log(totalAmount)
    return (
        <p>Number of exercises {totalAmount}</p>
    )
}

export default Total