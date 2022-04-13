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
export default Courses;  