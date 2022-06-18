import PropTypes from 'prop-types'
const BlogForm = ({
  handleNewBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
   }) => {
   return (
     <div>
       <h3>Kirjaa uusi blogi</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          otsikko:
          <input
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          kirjoittaja:
          <input
            id='author'
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          linkki:
          <input
            id='url'
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='submit-button' type="submit">Luo uusi</button>
      </form>
     </div>
   )
}
BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm