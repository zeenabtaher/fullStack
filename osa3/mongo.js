const mongoose = require('mongoose')

//luodaan tietokantaan uusi dokumentti komennolla node mongo.js salasana, jossa salasana on crusteria luotaessa annettu salasana
const password = process.argv[2]
const nimi = process.argv[3]
const numero = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.xn2nxzf.mongodb.net/personApp?retryWrites=true&w=majority`
mongoose.connect(url)

//Määritellään muistiinpanon skeema
const personSchema = new mongoose.Schema({
  nimi: {
    type: String,
    minlength: 1,
    required: true
  },
numero: {
    type: String,
    minlength: 1,
    required: true
  },
})
//skeemaa vastaava model, joka luo kopion skeemasta
const Person = mongoose.model('Person', personSchema)

//luodaan muistiinpanoa vastaava olio modelin avulla
const person = new Person({
  nimi: nimi,
  numero: numero,
})
if (process.argv.length === 3) {
    console.log('puhelinluettelo:')
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.nimi} ${person.numero}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
  }

person.save().then(result => {
  console.log('Tallennettiin ' + `${nimi}  ${numero}` + ' puhelinluetteloon')
  mongoose.connection.close() //tietokantayhteys suljetaan
})