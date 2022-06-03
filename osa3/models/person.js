const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
      })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const numeroValidator = {
    validator: (numero) => {
      if (numero.includes('-')) {
        return /^\d{2,3}-\d+/.test(numero) && numero.length >= 9
      } else {
        return /^\d{8,}/.test(numero)
      }
    },
    message: "Väärän muotoinen numero"
  }

  const personSchema = new mongoose.Schema({
    nimi: { 
      type: String, 
      required: true, 
      unique: true, 
      minlength: 3 
    },
    numero: {
      type: String,
      required: true,
      validate: numeroValidator
    }
  })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)