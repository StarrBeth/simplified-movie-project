async function main() {
  const movies = await fetch("https://www.omdbapi.com/?apikey=d33b9ed4&s=");
  const moviesData = await movies.json();
};

// function displayMovies(movies) {
//   const movieResults = movies.map(movie => {
//     const poster = movie.poster !== 'N/A' ? movie.poster : '';

//     return `
//       <div class="movie-card">
//         ${poster ? `<img class="movie-card__img" src="${poster}" alt="${movie.title} poster">` : `<div class="movie-card__poster-placeholder">Movie Poster Not Available</div>`}
//         <h2 class="movie-card__title">${movie.title}</h2>
//         <p class="movie-card__year">${movie.year}</p>
//       </div>
//     `;
//   }).join('');
