import PropTypes from 'prop-types'
const BlogForm = ({
  handleNewBog,
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
      <form onSubmit={handleNewBog}>
        <div>
          otsikko:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          kirjoittaja:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          linkki:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Luo uusi</button>
      </form>
     </div>
   )
}
BlogForm.propTypes = {
  handleNewBog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm