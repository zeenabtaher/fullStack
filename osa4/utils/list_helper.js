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

const mostBlogs = (blogs) => {
    if (blogs.length == 0)
        return 0
    else
        // nimet laitetaan taulukkoon
        var nimet = []
        for (let i=0; i < blogs.length; i++) {
            nimet.push(blogs[i].author)
        }

        // nimien esiintymisen laskenta
        const counts = {};
        nimet.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

        // nimien järjestäminen
        const sortedEntriesByVal = Object.entries(counts).sort(([, v1], [, v2]) => v1 - v2);
        const enitenBlogeja = sortedEntriesByVal[sortedEntriesByVal.length - 1]

        // laitetaan tulos haluttuun lopulliseen muotoon
        const tulos = {
            author: enitenBlogeja[0],
            blogs: enitenBlogeja[1]
          };

        return tulos
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  } 
