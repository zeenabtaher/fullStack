const { response } = require('express')
const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//pyynnön mukana lähetettyyn dataan päästään käsiksi json-parserin avulla
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms: token'))

morgan.token('token', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

let persons = [
   {
       id: 1,
       nimi: "Arto Hellas",
       numero: "040-123456"
   },
   {
       id: 2,
       nimi: "Jarkko Liedes",
       numero: "039-123456"   
   },
   {
    id: 3,
    nimi: "Dan Uunis",
    numero: "12-3456789"
   },
   {
    id: 4,
    nimi: "Pirkko-Liisa Kattilas",
    numero: "050-123456"
   }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
      const id = Number(request.params.id)
      const person = persons.find(person => person.id === id)

      if (person) {
          response.json(person)
      }
      else {
          response.status(404).end()
      }
      //console.log(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

    const generateId = () => {
    const newId = Math.random() * (10000 - 4) + 4
    return Math.floor(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    
    if (!body.nimi || !body.numero) {
        return response.status(404).json({
            error: 'nimi tai numero puuttuu'
        })
    }

    if (persons.find(person => person.nimi === body.nimi)) {
        return response.status(404).json({
            error: 'lisättävä nimi on jo luettelossa'
        })
    }

    const person = {
        id: generateId(),
        nimi: body.nimi,
        numero: body.numero
    }

    persons = persons.concat(person)
    response.json(person)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})