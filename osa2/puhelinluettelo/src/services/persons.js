import axios from 'axios'
const baseUrl = '/api/persons' //'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const poista = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  poista: poista
}

