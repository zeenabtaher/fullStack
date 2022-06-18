import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
//import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 

  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService
    .getAll()
    .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('error: tarkista käyttäjänimi tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {

    event.preventDefault()

    try {
      await blogService.create({
        title, author, url,
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      setErrorMessage(`Blogi "${title}", kirjoittajalta: "${author}" lisättiin listaan`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)

      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrorMessage('error: uuden blogin julkaiseminen ei onnistunut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id, blogObject) => {
    try {
    await blogService.update({id, blogObject})
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    } catch (exception) {
      setErrorMessage('Virhe: Tykkäys epäonnistui')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    console.log('poistetaan:', id)
    const kysymys = window.confirm("Haluatko varmasti poistaa tämän blogin?")
    if (kysymys) {
      try {
        await blogService.deleteBlog(id)
        blogService.getAll().then(blogs => 
          setBlogs( blogs )
        )
        setErrorMessage('Blogi on poistettu')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('Virhe: Poisto epäonnistui')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.startsWith('error:'))
      return (
        <div className="error">
          {message}
        </div>
      )
    else
    return (
      <div className="ilmoitus">
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
      <header><h2>Kirjaudu</h2></header> 
        <Notification message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
              <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
              <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">kirjaudu sisään</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <header><h2>Tervetuloa! Blogit ovat luettavissasi</h2></header>
      <Notification message={errorMessage}/>
      <p>{user.name} kirjautunut sisään <button onClick={handleLogout} type="button"> kirjaudu ulos</button></p> 
      <div>
       
      <Togglable buttonLabel='Luo uusi' ref={blogFormRef}>
        <BlogForm 
         handleNewBlog={handleNewBlog}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      </div>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} paivitys={handleLike} poisto={handleDelete}/>
      )}
      <Footer/>
    </div>
  )
}

export default App