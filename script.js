async function main(searchTerm) {
  const movies = await fetch(`https://www.omdbapi.com/?apikey=d33b9ed4&s=${searchTerm}`);
  const moviesData = await movies.json();
  console.log(moviesData);
  displayMovies(moviesData.Search);

function displayMovies(movies) {
  const movieResults = movies.map(movie => {
    const poster = movie.Poster !== 'N/A' ? movie.Poster : '';

    return `
      <div class="movie-card">
        ${poster ? `<img class="movie-card__img" src="${poster}" alt="${movie.Title} poster">` : `<div class="movie-card__poster-placeholder">Movie Poster Not Available</div>`}
        <h2 class="movie-card__title">${movie.Title}</h2>
        <p class="movie-card__year">${movie.Year}</p>
      </div>
    `;
  }).join('');

  document.getElementById('moviesGrid').innerHTML = movieResults;
  }
}

main('Marvel');