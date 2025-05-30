const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const peopleList = 'https://api.themoviedb.org/3/person/changes?page=1'
    
    const getPeopleList = async (peopleList) => {
        try {
            const response = await fetch(peopleList, options)
            const data = await response.json()
        } catch (error) {
            console.error('에러 발생:', error)
            
        }
    }


    getPeopleList(peopleList)
