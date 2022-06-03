//const { response } = require('express')
//const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

//pyynnön mukana lähetettyyn dataan päästään käsiksi json-parserin avulla
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms: token'))
app.use(express.static('build'))

app.use(express.json())
morgan.token('token', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
    .catch((error) => next(error))
  })


  app.get('/info', (req, res) => {
      let PVM = new Date()

      Person.find({}).then(person => {
        res.send(`
        <p>Puheliluettelossa on yhteensä ${person.length} henkilöä</p>
        <p>Aikaleima: ${PVM}</p>
        `)
      })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
    const body = req.body
  
    if (!body.nimi.length === 0) {
      return res.status(400).json({ error: 'Nimi puuttuu' })
    }
  
    if (!body.numero.length === 0) {
      return res.status(400).json({ error: 'Numero puuttuu' })
    }
  
    const person = new Person({
      nimi: body.nimi,
      numero: body.numero,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const person = {
      nimi: request.body.nimi,
      numero: request.body.numero,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, {new:true,runValidators:true})
      .then((updatedPerson) => {
        response.json(updatedPerson.toJSON())
      })
      .catch((error) => next(error))
  })
  

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  app.use(errorHandler)
  
  
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Serveri käynnistyi portissa ${PORT}`)
  }) 