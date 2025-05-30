const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}
const urlParams = new URLSearchParams(location.search)
const popularTVId = urlParams.get('popularTV_id')

const popularTVDetailUrl = `https://api.themoviedb.org/3/tv/${popularTVId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailPopularTV = async (popularTVDetailUrl) => {
   try {
      const response = await fetch(popularTVDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      let overview = !data.overview ? `미반영` : `${data.overview}`

      const rowHtml = `
       <div class="row">
          <div class="col-sm-3" style="text-align: center">
             <img src="${imgSrc}" alt="${data.title}" class="poster-detail" style="max-width:100%" />
          </div>
          <div class="col-sm-9 movie-detail">
             <h2>${data.name}</h2>
             <ul class="movie-info">
             <li>원제 ${data.original_name} ${data.original_language}</li>
                <li>평점 ${data.vote_average.toFixed(1)}</li>
                <li>최근 방영일: ${data.first_air_date}</li>
                <li>처음 방영일:${data.last_air_date}분</li>
             </ul>           
             <p>줄거리: ${overview}</p>
          </div>
       </div> 
`
      mainContainer.innerHTML += rowHtml

      await getSeasonsDate(popularTVDetailUrl)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailPopularTV(popularTVDetailUrl)

const getSeasonsDate = async (popularTVDetailUrl) => {
   try {
      const response = await fetch(popularTVDetailUrl, options)
      const data = await response.json()

      let castRowHtml = `
            <div class="row" style="margin-top:30px">
            <div class="card">
            <div class="card-body">
            `

      for (let i = 0; i < data.seasons.length; i++) {
         castRowHtml += `
         <p class="card-text">${data.seasons[i].name} (평점: ${Number(data.seasons[i].vote_average) === 0 ? '미반영' : data.seasons[i].vote_average.toFixed(1) + '점'})<a href="#">보러가기</a> - ${data.seasons[i].air_date === null ? '방영일 미정' : data.seasons[i].air_date + ' 방영'}</p>
           `
      }

      castRowHtml += `</div></div></div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {}
}
