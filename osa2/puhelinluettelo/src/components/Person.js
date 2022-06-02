const Person = ({ person, poista }) => {
    return (
      <p>
        {person.nimi} {person.numero}
        {" "}
        <button onClick={() => poista(person.id)}>poista</button>
      </p>
    )
}

export default Person