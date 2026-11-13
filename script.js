let currentMovies = [];

function loadingState() {
  const loadingHTML = `
    <div class="movie-card movie-card--skeleton">
      <div class="movie-card__img--skeleton"></div>
      <div class="movie-card__title--skeleton"></div>
      <div class="movie-card__year--skeleton"></div>
    </div>
  `};

  const skeletons = Array.from({ length: 10 }, () => loadingHTML).join('');


  document.getElementById('moviesGrid').innerHTML = skeletons;

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

async function main(searchTerm) {
  loadingState();

  const movies = await fetch(`https://www.omdbapi.com/?apikey=d33b9ed4&s=${searchTerm}`);
  const moviesData = await movies.json();

  setTimeout(() => {
    currentMovies = moviesData.Search;
    document.getElementById("resultsInfo").innerHTML = `<span>Showing: </span>${searchTerm}`; 
    displayMovies(currentMovies);
  }, 1000);
}

document.getElementById("sortSelect").addEventListener("change", (event) => {
  const sorted = [...currentMovies];
  if (event.target.value === "a-z") sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  if (event.target.value === "z-a") sorted.sort((a, b) => b.Title.localeCompare(a.Title));
  if (event.target.value === "newest") sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  if (event.target.value === "oldest") sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  displayMovies(sorted);
});

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById("searchInput").value;
  main(searchTerm); 
});