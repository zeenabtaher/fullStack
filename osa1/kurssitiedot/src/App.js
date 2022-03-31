/*
const App = () => {
  const course = 'Half Stack application development'
  const osa1 = 'Fundamentals of React'
  const maara1 = 10
  const osa2 = 'Using props to pass data'
  const maara2 = 7
  const osa3 = 'State of a component'
  const maara3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content osa1 ={osa1} osa2 ={osa2} osa3 ={osa3} maara1 ={maara1} maara2 ={maara2} maara3 ={maara3}/>
      <Total maara1 ={maara1} maara2 ={maara2} maara3 ={maara3}/>
    </div>
  )
}

const Header = (props) => {
 return(
  <div>
    <p> Kurssin nimi on {props.course}</p>
  </div>
 )
}
const Part = (props) => {
  return(
    <div>
      <p>
       Osan nimi on {props.osa}, jossa tehtävienmäärä on {props.maara}
      </p>
    </div>
   )
}
const Content = (props) => {
  return (
    <div>
      <Part osa = {props.osa1} maara={props.maara1}/>
      <Part osa = {props.osa2} maara={props.maara2}/>
      <Part osa = {props.osa3} maara={props.maara3} />
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
     <p> Tehtävien yhteismäärä on {props.maara1 + props.maara2 + props.maara3}</p>
    </div>
  )
}
*/

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
     <Header course = {course.name}/>
     <Content part1 = {course.parts[0].name} tehtavat1 = {course.parts[0].exercises}
     part2 = {course.parts[1].name} tehtavat2 = {course.parts[1].exercises}
     part3 ={course.parts[2].name} tehtavat3 = {course.parts[2].exercises}/>
     <Total yhteensa = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = (props) =>{
  return <p> osan nimi: {props.osa} Tehtävienmäärä: {props.maara}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part osa = {props.part1} maara={props.tehtavat1}/>
      <Part osa = {props.part2} maara={props.tehtavat2}/>
      <Part osa = {props.part3} maara={props.tehtavat3} />
    </div>
  )
}
const Total = (props) =>{
  return(
    <div>
     <p> Tehtävien yhteismäärä on {props.yhteensa}</p>
    </div>
  )
}



export default App