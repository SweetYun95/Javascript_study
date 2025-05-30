const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const urlParams = new URLSearchParams(location.search)
const peopleId = urlParams.get('people_id')

const peopleDetailUrl = `https://api.themoviedb.org/3/person/${peopleId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailPopularTV = async (peopleDetailUrl) => {
   try {
      const response = await fetch(peopleDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.profile_path}`
      const genderMap = {
         1: '여자',
         2: '남자',
      }
      const genderText = genderMap[data.gender] || '성별 정보 없음'

      const rowHtml = `
        <div class="row">
           <div class="col-sm-3" style="text-align: center">
              <img src="${imgSrc}" alt="${data.name}" class="poster-detail" style="max-width:100%" />
           </div>
           <div class="col-sm-9 movie-detail">
              <h2>${data.name}</h2>
              <ul class="movie-info">
              <li>생년월일 ${data.birthday === null ? '미등록' : data.birthday}</li>
              <li>성별: ${genderText}</li>
              <li>인지도: ${data.popularity.toFixed(1)}</li>                     
              </ul>           
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, ratione aliquam totam corrupti, repudiandae nemo ducimus culpa, blanditiis magni molestias quo minima eos amet nam assumenda quibusdam quia? Non, quae?</p>         
           </div>
        </div> 
 `
      mainContainer.innerHTML += rowHtml
      await getPeopleList(peopleList)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailPopularTV(peopleDetailUrl)

const peopleList = `https://api.themoviedb.org/3/person/${peopleId}/movie_credits?language=ko-KR`

const getPeopleList = async (peopleList) => {
   try {
      const response = await fetch(peopleList, options)
      const data = await response.json()

      let castRowHtml = `<div class="row" style="margin-top:30px">`

     
      for (let i = 0; i < data.cast.length; i++) {
         if (i === 6) break 

         let posterImg = !data.cast[i].poster_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].poster_path}`

         castRowHtml += `
             <div class='col-sm-2 p-3'>
                <div class="card">
                  <img src="${posterImg}" class="card-img-top" alt="${data.cast[i].title}" >
                     <div class="card-body">
                       <p class="card-text">${data.cast[i].title}</p>
                        <p class="card-text">${Number(data.cast[i].vote_average) === 0 ? '미반영' : data.cast[i].vote_average.toFixed(1) + '점'}</p>
                     </div>
                </div>
             </div>
         `
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
