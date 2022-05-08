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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})