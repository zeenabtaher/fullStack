//const { response } = require('express')
//const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

//pyynnön mukana lähetettyyn dataan päästään käsiksi json-parserin avulla
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms: token'))

morgan.token('token', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })


  app.get('/info', (req, res) => {
      let MAARA = persons.length
      let PVM = new Date()

      res.send(`
      <p>Puheliluettelossa on yhteensä ${MAARA} henkilöä</p>
      <p>Aikaleima: ${PVM}</p>
      `)
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(persons => {
        response.json(persons)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
  
    if (!body.nimi) {
      return res.status(400).json({ error: 'Nimi puuttuu' })
    }
  
    if (!body.numero) {
      return res.status(400).json({ error: 'Numero puuttuu' })
    }
  
    const person = new Person({
      nimi: body.nimi,
      numero: body.numero,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
  })
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Serveri käynnistyi portissa ${PORT}`)
  }) 