const { response } = require('express')
const { request } = require('express')
const express = require('express')
const app = express()

//pyynnön mukana lähetettyyn dataan päästään käsiksi json-parserin avulla
app.use(express.json())

let persons = [
   {
       id: 1,
       name: "Arto Hellas",
       number: "040-123456"
   },
   {
       id: 2,
       name: "Jarkko Liedes",
       number: "039-123456"   
   },
   {
    id: 3,
    name: "Dan Uunis",
    number: "12-3456789"
   },
   {
    id: 4,
    name: "Pirkko-Liisa Kattilas",
    number: "050-123456"
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

  app.get('/api/persons/:id', (request,response) => {
      const id = Number(request.params.id)
      person = persons.find(p => p.id === id)

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
    persons = persons.find(p => p.id !== id)

    response.status(204).end()
    
  })

    const generateId = () => {
    const newId = Math.random() * (10000 - 4) + 4
    return Math.floor(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'nimi tai numero puuttuu'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(404).json({
            error: 'lisättävä nimi on jo luettelossa'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})