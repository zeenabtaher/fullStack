describe('Blog app', function() {
  const user = {
    name: "mr.lobaloba",
    username: "loba",
    password: "loba",
  }
  const blog = {
    title: 'Blogi aihe',
    author: 'Blogin kirjoittaja',
    url: 'https://linkki',
  }
  const testiBlog = {
    title: 'ei toimi',
    author: 'kirjoittaja',
    url: 'https://linkki',
    likes: 0
  }


  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit('http://localhost:3000')
  })
  //tehtävä 5.17 - step1
  it('Kirjautumis lomakkeen näkeminen', function() {
    cy.contains('kirjaudu sisään')
  })

  //tehtävä 5.18 - step2
  describe('Login',function() {
    it('Oikea käyttäjätunnut ja salasana', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains(`${user.name} kirjautunut sisään`)
    })

    it('Väärä käyttäjä tunnus tai salasana', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    })
  })
 
  describe('Kirjaudutaan sisään', function() {
    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })
    //tehtävä 5.19 - step3
    it('Käyttäjä voi tehdä blogin', function() {
      cy.contains("Luo uusi");
      cy.contains("Luo uusi").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("button[type=submit]").click();
      cy.get("html").contains(`${blog.title} ${blog.author}`);
     
    })

    //tehtävä 5.20 - step4
    it("Käyttäjä voi tykätä blogista", function () {

      cy.contains(`${blog.title} ${blog.author}`)
        
      cy.contains("Katso").click();
      cy.contains(`Linkki: ${blog.url}`);
      cy.get("#likes").click()
      cy.request('GET', 'http://localhost:3003/api/blogs').as('blogs')

      cy.get('@blogs').should((response) => {
        const data = response.body
        expect(data[0].likes).to.equal(1)
      })
    })

    //tehtävä 5.21 - step5
    it('Käyttäjä voi poistaa blogin', function () {
      
      cy.contains(`${blog.title} ${blog.author}`)
        
      cy.contains("Katso").click()
      cy.contains(`Linkki: ${blog.url}`)
      cy.get("#delete-button").click()
      cy.contains("Blogi on poistettu")
    })

    //tehtävä 5.22 - step6
    it("Blogi on järjestetty tykkäysten mukaan", function () {
      cy.get(".blog").eq(0).should("contain", blog.title);
      cy.get(".blog").eq(1).should("contain", testiBlog.title);

     
      cy.contains(`${blog.title} ${blog.author}`)
        
      cy.contains("Katso").click()
      cy.contains(`Linkki: ${testiBlog.url}`)
      cy.get("#likes").click()
      cy.request('GET', 'http://localhost:3003/api/blogs').as('blogs')
      cy.contains(`Tykkäykset: ${testiBlog.likes + 1}`)

      cy.wait(3000).then(function () {
        cy.get("#likes").click()
      cy.request('GET', 'http://localhost:3003/api/blogs').as('blogs')
      cy.contains(`Tykkäykset: ${testiBlog.likes + 1}`)
      })
      cy.wait(3000).then(function () {
        cy.get(".blog").eq(0).should("contain", testiBlog.title);
        cy.get(".blog").eq(1).should("contain", blog.title);
      })
    })
  })
})