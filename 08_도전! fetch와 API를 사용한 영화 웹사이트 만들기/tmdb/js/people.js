const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const peopleList = 'https://api.themoviedb.org/3/person/popular?language=ko-KR&page=1'

const getPeopleList = async (peopleList) => {
   try {
      const response = await fetch(peopleList, options)
      const data = await response.json()

      const results = data.results

      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j

            const people = results[index]

            rowHtml += `
                 <div class="col-sm-3 p-3">
                      <div class="card">
                         <a href="./peopledetail.html?people_id=${people.id}"> 
                            <img src="https://image.tmdb.org/t/p/w500${people.profile_path}" class="card-img-top poster" alt="${people.title}" />
                         </a>
                         <div class="card-body">
                            <p class="card-text title">${people.name}</p>
                            <p class="card-text average">인지도 ${people.popularity.toFixed(1)}</p>
                            <p>출연작: ${people.known_for.map((movie) => movie.title)}</p>
                         </div>
                      </div>
                 </div>
              `
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getPeopleList(peopleList)
