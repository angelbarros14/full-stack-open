import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
    {course.parts.reduce((sum, num) => sum + num.exercises, 0)}
    return (
        <>
            <Header course={course.name} />
            {course.parts.map((part) => (
            <div key={part.id}>
            <Content part={part.name} exercise={part.exercises} />
            </div>
            ))}
            <Total course={course}/>
        </>
            
    )
}

export default Course