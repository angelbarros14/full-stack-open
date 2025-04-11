const Total = ({ course }) => {
    const totalSum = course.parts.reduce((sum, num) => sum + num.exercises, 0)
    // access the course array's length
        return (
            <p>total of {totalSum} exercises</p>
        )}
export default Total