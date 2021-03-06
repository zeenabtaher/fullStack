const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})


    const tyhjäBlogiLista = []

    const yhdenBloginLista = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const Useatblogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  const suosikkiBlogi = 
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

  const ennatysBlogi = 
  {
    author: "Robert C. Martin",
    blogs: 3
  }
 
    
//==================tesitt tykätyimälle blogille===================
  describe('total likes', () => {

      test('tyhjä blogilista', () => {
        const result = listHelper.totalLikes(tyhjäBlogiLista)
        expect(result).toBe(0)
      })
  
    test('yhdessä blogissa olevien tykkäyksien määrä', () => {
      const result = listHelper.totalLikes(yhdenBloginLista)
      expect(result).toBe(5)
    })

    test('useasta blogissa olevien tykkäyksien määrä', () => {
        const result = listHelper.totalLikes(Useatblogs)
        expect(result).toBe(36)
      })
  })

  //================testit suosikkiblogeille=======================
  describe('favorite blogs', () => {

    test('tyhjä blogilista', () => {
      const result = listHelper.favoriteBlog(tyhjäBlogiLista)
      expect(result).toEqual(0);
    })
  
    test('suosikkiblogi', () => {
      const result = listHelper.favoriteBlog(Useatblogs)
      expect(result).toEqual(suosikkiBlogi);
    })
  
  }) 

//============testit ennätysbloggaajalle==========================
  describe('most blogs', () => {
    test('tyhjä blogilista', () => {
      const result = listHelper.mostBlogs(tyhjäBlogiLista)
      expect(result).toEqual(0);
    })

    test('eniten blogeja', () => {
      const result = listHelper.mostBlogs(Useatblogs)
      expect(result).toEqual(ennatysBlogi);
    })

  })