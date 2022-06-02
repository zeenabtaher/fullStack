/*import Person from "./Person"

const Persons = ({ filtteri, poista }) => {
    return(
        <div>
            {filtteri.map(nimi => 
                <Person key={nimi.id} person={nimi} number={nimi.numero} poista={poista} />
            )}
        </div>
    )
}

const Person = ({ person, poista }) => {
    return (
      <p>
        {person.nimi} {person.numero}
        {" "}
        <button onClick={() => poista(person.id)}>poista</button>
      </p>
    )
}
*/


const Persons = ({filtteri, poista}) => {
    return(
      <div>
        {filtteri.map(persons =>
        <p key={persons.id}>
          {persons.nimi} {persons.numero}
          <button onClick={() => poista(persons.id)}>poista</button>
        </p>
       )}
      </div>
    )}
export default Persons