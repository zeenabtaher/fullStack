import TogglableText from "./TogglableText"
const Blog = ({blog}) => (
  <div>
   <p>{blog.title} {blog.author}</p> 
    <TogglableText buttonLabel="Katso">
      <small>
      Aihe: <i> {blog.title} </i>
      <br />
      Kirjoittaja: <i> {blog.author} </i>
      <br />
      Tykkäykset: <i> {blog.likes} </i> <button type = "submit">Tykkää</button>
      <br />
      Osoite: <i> {blog.url} </i>
      </small>
    </TogglableText>
  </div>  
)

export default Blog