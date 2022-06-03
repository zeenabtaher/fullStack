/*import Person from "./Person"

const Persons = ({ filtteri, poista }) => {
    return(
        <div>
            {filtteri.map(nimi => 
                <Person key={nimi.id} person={nimi} numero={nimi.numero} poista={poista} />
            )}
        </div>
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