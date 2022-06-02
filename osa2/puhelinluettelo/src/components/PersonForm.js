import InputField from "./InputField"

const PersonForm = ({ onSubmit, newName, newNumber, nameChange, numberChange }) => {
    return(
        <form onSubmit={onSubmit}>
            <InputField
                label="nimi:"
                type="text"
                value={newName}
                onChange={nameChange}
            />
            <InputField
                label="numero:"
                type="text"
                value={newNumber}
                onChange={numberChange}
            />
            <button type="submit">lisää</button>
        </form>
    )
}
export default PersonForm

/*
const PersonForm = ({onSubmit, newName, newNumber, nameChange, numberChange}) => {
    return(
      <form onSubmit={onSubmit}> 
        <div>
          nimi: <input value={newName} onChange={nameChange}/>
        </div>
        <div>
          puhelinnumero: <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
              <button type="submit">lisää</button>
            </div>
      </form>
    )
    }*/