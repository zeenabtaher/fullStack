const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
if (blogs.length == 0)
    return 0
else
    yhteensa = 0
    for (let i=0; i < blogs.length; i++) {
        yhteensa += blogs[i].likes
    }
    return yhteensa
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0)
        return 0
    else
        favorite = blogs[0]
        likes = 0
        for (let i=0; i < blogs.length; i++) {
            if (likes < blogs[i].likes) {
                favorite= blogs[i]
                likes = blogs[i].likes
            }
        }
        return favorite
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  } 
