const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const testiBlogi = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(testiBlogi[0])
  await blogObject.save()
  blogObject = new Blog(testiBlogi[1])
  await blogObject.save()
})

describe('blogilista JSON-muodoksi', () => {
  test('oikea määrä blogeja JSON muotoisena', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('kaikkien blogien hakeminen', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogi.length)
  })
})

test('blogien identifoivan kentän nimi tulee olla id', async() => {
    const response = await api
    .get('/api/blogs')

    for( let i=0; i < testiBlogi.length; i++ ){
        expect(response.body[i].id).toBeDefined()
    }
})

afterAll(() => {
  mongoose.connection.close()
})