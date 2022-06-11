import TogglableText from "./TogglableText"

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
   <p>{blog.title} {blog.author}</p> 
    <TogglableText buttonLabel="Katso">
      <small>
      Aihe: <i> {blog.title} </i>
      <br />
      Kirjoittaja: <i> {blog.author} </i>
      <br />
      Tykkäykset: <i> {blog.likes} </i> <button onClick={tykkaa}>Tykkää</button>
      <br />
      Linkki: <i> {blog.url} </i>
      </small>
      <br />
      <button onClick={poista}>poista blogi</button>
    </TogglableText>
  </div>  
)}

export default Blog