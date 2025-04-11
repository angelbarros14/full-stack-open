import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course => (
                <div key={course.id}>
                    <Header name={course.name} />

                    {course.parts.map(part => (
                        <div key={part.id}>
                            <Content part={part.name} exercise={part.exercises} />
                        </div>
                    ))}

                    <Total course={course}/>
                </div>
            ))}
        </>
            
    )
}

export default Course