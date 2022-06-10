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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewBog = async (event) => {

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
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">kirjaudu sisään</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <header><h2>Tervetulo! Blogit ovat luettavissasi</h2></header>
      <Notification message={errorMessage}/>
      <p>{user.name} kirjautunut sisään <button onClick={handleLogout} type="button"> kirjaudu ulos</button></p> 
      <div>
       
      <Togglable buttonLabel='Luo uusi' ref={blogFormRef}>
        <BlogForm 
         handleNewBog={handleNewBog}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>

      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Footer/>
    </div>
  )
}

export default App