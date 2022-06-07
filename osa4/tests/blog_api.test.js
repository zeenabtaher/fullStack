const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const helper = require('./test_helper')


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

test('uuden blogin lisääminen HTTP POST-pyynnöllä', async() => {
    const uusiBlogi = {
    "title": "Maailman paras blogi",
    "author": "kirjoittaja Z",
    "url": "tähän tulee osoite",
    "likes": 5
    }

    await api
    .post('/api/blogs')
    .send(uusiBlogi)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogi.length + 1)
})

test('blogi, jossa tykkäyksiä ei ole', async() => {
    const eitykattyBlogi = {
    "title": "huono blogi",
    "author": "epämääräinen kirjailija",
    "url": "tähän tulee osoite",
    }

    await api
    .post('/api/blogs')
    .send(eitykattyBlogi)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogi.length + 1)
})

test('blogi, jossa ei ole title-kenttää', async() => {
    const eititleaBlogi = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }

    await api
    .post('/api/blogs')
    .send(eititleaBlogi)
    .expect(400)
    /*.expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogi.length)*/
    const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
})

test('blogi, jossa ei ole url-kenttää', async() => {
    const eiurlBlogi = {
    "title": "huono blogi",
    "author": "epämääräinen kirjailija",
    }

    await api
    .post('/api/blogs')
    .send(eiurlBlogi)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testiBlogi.length)
})

test('blogin poistaminen', async () => {
  const response = await api.get('/api/blogs')
  const ekaId = response.body[0].id
  await api
  .delete(`/api/blogs/${ekaId}`)
  .expect(204)
})

describe('alussa on yksi käyttäjä', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('uuden käyttjänimen tekeminen', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mj',
      name: 'Maija Meikäläinen',
      password: 'kissa123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('mikäli kyseinen käyttäjänimi on jo käytössä', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'kissa123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})


afterAll(() => {
  mongoose.connection.close()
})