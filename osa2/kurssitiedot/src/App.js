const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
 
  return (
    <div>
        {/*<ul>{course.parts.map(parts => <li>{parts.name}</li>)}</ul>*/}
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  
  return (
    <div>
      <Header course={course.name}/>
      <ul>
       {course.parts.map(parts => 
          <Content key={parts.id} osat = {parts}/>
        )}
        <Total osat={course.parts} />
        </ul>
         
    </div>
  )
}


const Header = (props) =>{  
  return(
    <h1> {props.course} </h1>
  )
}
const Content = ({osat}) => {
return(
  <div>
    <p>{osat.name} {osat.exercises}</p>
   
  </div>
)
} 

const Total = ({osat}) => {
  const yhteensa = osat.reduce((eka, loput) => 
   eka + loput.exercises, 0)

  return (
    <p>Yhteensä tehtäviä on {yhteensa}</p>
  )
}

export default App;
