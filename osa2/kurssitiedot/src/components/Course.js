import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.course} </h2>
        </div>
    )
}
const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}
const Content = (props) => {
    return (
        <div>
            {props.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}
const Total = ({ parts }) => parts.map(part => part.exercises).reduce((s, p) => s + p)

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <h2>total of <Total parts={course.parts} /> exrecises</h2>
        </div>
    )
}
export default Course