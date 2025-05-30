const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const popularTV = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getpopularTV = async (popularTV) => {
   try {
      const response = await fetch(popularTV, options)
      const data = await response.json()

      const results = data.results

      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 4; j++) {
            const index = i + j

            const popularTV = results[index]
            let overview = !popularTV.overview ? `미반영` : `${popularTV.overview}`

            rowHtml += `
                         <div class="col-sm-3 p-3">
                  <div class="card">
                     <a href="./popularTVDetail.html?popularTV_id=${popularTV.id}">
                        <img src="https://image.tmdb.org/t/p/w500${popularTV.poster_path}" class="card-img-top poster" alt="${popularTV.name}" />
                     </a>
                     <div class="card-body">
                        <p class="card-text title">${popularTV.name}</p>
                    <p class="card-text average">평점 ${Number(popularTV.vote_average) === 0 ? '미반영' : popularTV.vote_average.toFixed(1) + '점'}</p>
                        <p>줄거리: ${overview}</p>
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

getpopularTV(popularTV)
