document.getElementById('hamburger').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
  });

  const moviesContainer = document.getElementById("movies-container");
if (moviesContainer) {
  fetch("/js_pages/movies_db.json")
    .then((response) => response.json())
    .then((data) => {
      data.movies.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add(
          "bg-[#1c1c1c]",
          "rounded-lg",
          "overflow-hidden",
          "hover:ring-2",
          "ring-red-500",
          "transition-all",
        );
        card.innerHTML = `
          <div class="relative">
            <img src="${movie.Images[0]}" alt="${movie.Title}" class="w-full h-72 object-cover"/>
            <span class="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              &#9733; ${movie.imdbRating}
            </span>
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-1">
              <h3 class="font-semibold text-white">${movie.Title}</h3>
              <span class="text-gray-400 text-xs">${movie.Year}</span>
            </div>
            <p class="text-gray-400 text-xs mb-3">${movie.Genre}</p>
            <p class="text-gray-400 text-xs leading-relaxed mb-4">${movie.Plot}</p>
            <a href="details.html?id=${movie.imdbID}"
               class="block bg-red-600 hover:bg-red-700 text-center py-2 rounded text-sm font-semibold transition-colors">
              View Details
            </a>
          </div>
        `;
        moviesContainer.appendChild(card);
      });
    })
    .catch((err) => console.error("Failed to load movies:", err));
}


const detailsContainer = document.getElementById("container");
if (detailsContainer) {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  fetch("/js_pages/movies_db.json")
    .then((response) => response.json())
    .then((data) => {
      const movie = data.movies.find((m) => m.imdbID === movieId);

      if (!movie) {
        detailsContainer.innerHTML =
          "<p class='text-gray-400'>Movie not found.</p>";
        return;
      }

      detailsContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-10">

          <!-- Poster -->
          <div class="w-full md:w-80 shrink-0">
            <img src="${movie.Images[0]}" alt="${movie.Title}"
              class="w-full h-full rounded-lg object-cover shadow-lg"/>
          </div>

          <!-- Info -->
          <div class="flex-1">

            <p class="text-red-600 text-sm font-semibold tracking-widest uppercase mb-2">${movie.Genre}</p>
            <h1 class="text-5xl font-[Bebas_Neue] leading-none mb-4">${movie.Title}</h1>

            <!-- Badges -->
            <div class="flex flex-wrap gap-3 mb-6">
              <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">&#9733; ${movie.imdbRating}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Year}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Runtime}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Rated}</span>
            </div>

            <p class="text-gray-300 leading-relaxed mb-6">${movie.Plot}</p>

            <!-- Watch & Trailer Buttons -->
            <div class="flex flex-wrap gap-4 mb-8">
              <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' full movie')}"
                target="_blank"
                class="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition-colors inline-flex items-center gap-2">
                ▶ Watch Movie
              </a>
              <a href="#trailer"
                class="border border-white/40 hover:bg-white/10 px-8 py-3 rounded font-semibold transition-colors inline-flex items-center gap-2">
                🎬 Watch Trailer
              </a>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Director</p>
                <p class="text-white">${movie.Director}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Writers</p>
                <p class="text-white">${movie.Writer}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Actors</p>
                <p class="text-white">${movie.Actors}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Language</p>
                <p class="text-white">${movie.Language}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Country</p>
                <p class="text-white">${movie.Country}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Awards</p>
                <p class="text-white">${movie.Awards}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">Metascore</p>
                <p class="text-white">${movie.Metascore}</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">IMDB Votes</p>
                <p class="text-white">${movie.imdbVotes}</p>
              </div>
            </div>

            <!-- Back Button -->
            <div class="mt-8">
              <a href="movies.html"
                class="border border-white/40 hover:bg-white/10 px-8 py-3 rounded font-semibold transition-colors inline-block">
              Back to Movies
              </a>
            </div>

          </div>
        </div>

        <!-- Trailer Section -->
        <div id="trailer" class="mt-16">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-1 h-7 bg-red-600 rounded"></div>
            <h2 class="text-3xl font-[Bebas_Neue] tracking-wide">Official Trailer</h2>
          </div>
          <div class="w-full aspect-video rounded-lg overflow-hidden bg-[#1c1c1c]">
            <iframe
              class="w-full h-full"
              src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(movie.Title + ' official trailer')}"
              title="${movie.Title} Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      `;
    })
    .catch((err) => console.error("Failed to load movie details:", err));
}