const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTRmNTI2MTc0MGI2NzJlOGYxNDE5M2FiMmE2ZmQzYyIsInN1YiI6IjY1MmY5ZjRkMGNiMzM1MTZmODg1NmY0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hjPp1Dau-gIjV0vsPpHYAgo2lz_kyCpMenvTBhoKDaA'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    const movieList = parseMovieList(response);
    const $button = document.getElementById("searchBtn");
    const $movieList = document.getElementById("movie-list");
    $movieList.innerHTML = movieList;
    $button.addEventListener("click", searchBtnOnClick);
  })
  .catch((err) => console.error(err));

function parseMovieList(response) {
  let movies = "";
  let movieList = response["results"];

  for (let i = 0; i < movieList.length; i++) {
    let id = movieList[i].id;
    let title = movieList[i].title;
    let overview = movieList[i].overview;
    let popularity = movieList[i].popularity;
    let vote_average = movieList[i].vote_average;

    let img_poster_path = movieList[i].poster_path;
    let img_base_path = "https://image.tmdb.org/t/p/w500";
    let img_path = img_base_path + img_poster_path;

    movies += `<div class= "movie-card" id="${id}" name="${title}" onclick="alertOnClick(${id})">
    <img src="${img_path}" />
    <h3> ${title}</h3>
    <p> ${overview}</p>
    <p> Popularity : ${popularity} </p>
    <p> Rating : ${vote_average} </p>
    </div>`;
  }

  return movies;
}

function alertOnClick(id) {
  alert(`ID: ${id}`);
}

function searchBtnOnClick(event) {
  event.preventDefault();
  const $movieList = document.getElementById("movie-list");
  const inputname = document.querySelector(".searchInput").value;
  const searchList = document.querySelectorAll("div");


  if (inputname === "") {
    alert(`Please enter a movie title`);
  } else {
    $movieList.innerHTML = "";

    searchList.forEach(function (element) {
      let nameAttribute = element.getAttribute("name");
      if (nameAttribute === null) {
        nameAttribute = "";
      }

      const inputstr = inputname.toLowerCase();
      const nameAttributestr = nameAttribute.toLowerCase();
      const nameAttributearr = nameAttributestr.split(" ");
      
      let isSearch = nameAttributearr.find((word) => word.includes(inputstr));
      if (isSearch) {
        
        $movieList.innerHTML += element.outerHTML;
      }
    });
  }
}
    