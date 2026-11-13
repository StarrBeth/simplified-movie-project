async function main(searchTerm) {
function loadingState() {
  const loadingHTML = `
    <div class="movie-card movie-card--skeleton">
      <div class="movie-card__img--skeleton"></div>
      <div class="movie-card__title--skeleton"></div>
      <div class="movie-card__year--skeleton"></div>
    </div>
  `;

  document.getElementById('moviesGrid').innerHTML = loadingHTML;
}

  const movies = await fetch(`https://www.omdbapi.com/?apikey=d33b9ed4&s=${searchTerm}`);
  const moviesData = await movies.json();
  console.log(moviesData);
  displayMovies(moviesData.Search);

function displayMovies(movies) {
  const movieResults = movies.map(movie => {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : '';

    return `
      <div class="movie-card">
        <img class="movie-card__img" src="${poster}" alt="${movie.Title} poster" onerror="this.outerHTML='<div class=&quot;movie-card__poster-placeholder&quot;>Movie Poster Not Available</div>'">
        <h2 class="movie-card__title">${movie.Title}</h2>
        <p class="movie-card__year">${movie.Year}</p>
      </div>
    `;
  }).join('');

  document.getElementById("resultsInfo").innerHTML = `<span>Showing: </span>${searchTerm}`;
  document.getElementById('moviesGrid').innerHTML = movieResults;
  }
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById("searchInput").value;
  main(searchTerm); 
})