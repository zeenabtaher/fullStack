import TogglableText from "./TogglableText"
import { useState } from "react"

const Blog = ({blog, paivitys, poisto}) => {

  const tykkaa = () => {
    const { id, author, url, title, } = blog
    if (blog.likes == null) {
      blog.likes = 0
    }
    const paivitetty = {
      title,
      author,
      url,
      likes: blog.likes + 1,
      user: blog.user?.id || blog.user,
    }
    paivitys(id, paivitetty)
  }

  const poista = () => {
    const { id } = blog
    poisto(id)
  }


return (
  <div>
    <p className="title">{blog.title}</p> <p className="author">{blog.author}</p>
    <TogglableText buttonLabel="Katso" className="blog-tiedot">
      <small>
      Aihe: <i> {blog.title} </i>
      <br />
      Kirjoittaja: <i > {blog.author} </i>
      <br />
      Tykkäykset: <i className="likes"> {blog.likes} </i> <button onClick={tykkaa}>Tykkää</button>
      <br />
      Linkki: <i className="url"> {blog.url} </i>
      </small>
      <br />
      <button onClick={poista}>poista blogi</button>
    </TogglableText>
  </div>
)}

export default Blog

    /* */