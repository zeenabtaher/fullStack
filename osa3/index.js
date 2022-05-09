const { response } = require('express')
const { request } = require('express')
const express = require('express')
const app = express()

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
    console.log(person)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})