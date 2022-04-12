const App = () => {
  /*const course = {
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
  }*/
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
 
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(({name, id, parts}) => (
       <Content key={id} osat={parts} name={name}/> 
      ))}
    </div>
  )
}


const Header = ({name}) => <h2> {name} </h2>

const Content = ({osat, name}) => {
return(
  <div>
    <Header name={name}/>
    <Osat osat={osat}/>  
    <Total osat={osat}/>
  </div>
)
} 

const Osat = ({osat}) => {
  return(
    <div>
      {osat.map(({name, id, exercises}) => (
         <p key={id}>
        {name} {exercises} 
        </p>
      ))}
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
