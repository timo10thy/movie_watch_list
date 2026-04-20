// ═══════════════════════════════════════════════
//  HAMBURGER MENU TOGGLE
// ═══════════════════════════════════════════════
const hamburgerBtn = document.getElementById('hamburger');
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
    }
  });
}


// ═══════════════════════════════════════════════
//  DETECT WHICH PAGE IS RUNNING
//  index.html is at root — needs src/pages/details.html
//  movies.html is at src/pages/ — needs just details.html
// ═══════════════════════════════════════════════
const currentPath = window.location.pathname;
const isHomePage  = currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('.vercel.app/');
const detailsPath = isHomePage ? 'src/pages/details.html' : 'details.html';
const jsonPath    = isHomePage ? 'js_pages/movies_db.json' : '../../js_pages/movies_db.json';


// ═══════════════════════════════════════════════
//  MOVIES LISTING
//  Works on both index.html and movies.html
// ═══════════════════════════════════════════════
const moviesContainer = document.getElementById("movies-container");
if (moviesContainer) {
  fetch(jsonPath)
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
            <a href="${detailsPath}?id=${movie.imdbID}"
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


// ═══════════════════════════════════════════════
//  MOVIE DETAILS — src/pages/details.html
// ═══════════════════════════════════════════════
const detailsContainer = document.getElementById("container");
if (detailsContainer) {
  const params  = new URLSearchParams(window.location.search);
  const movieId = params.get("id");

  fetch("../../js_pages/movies_db.json")
    .then((response) => response.json())
    .then((data) => {
      const movie = data.movies.find((m) => m.imdbID === movieId);

      if (!movie) {
        detailsContainer.innerHTML =
          "<p class='text-gray-400 text-center py-20'>Movie not found. Please go back and select a movie.</p>";
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

            <div class="flex flex-wrap gap-3 mb-6">
              <span class="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">&#9733; ${movie.imdbRating}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Year}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Runtime}</span>
              <span class="bg-[#1c1c1c] text-gray-300 text-xs px-3 py-1 rounded">${movie.Rated}</span>
            </div>

            <p class="text-gray-300 leading-relaxed mb-6">${movie.Plot}</p>

            <div class="flex flex-wrap gap-4 mb-8">
              <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + ' full movie')}"
                target="_blank"
                class="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition-colors inline-flex items-center gap-2">
                &#9654; Watch Movie
              </a>
              <a href="#trailer"
                class="border border-white/40 hover:bg-white/10 px-8 py-3 rounded font-semibold transition-colors inline-flex items-center gap-2">
                Watch Trailer
              </a>
            </div>

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

            <div class="mt-8">
              <a href="movies.html"
                class="border border-white/40 hover:bg-white/10 px-8 py-3 rounded font-semibold transition-colors inline-block">
                Back to Movies
              </a>
            </div>

          </div>
        </div>

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


// ═══════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.classList.remove('hidden');
  }
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('hidden');
  }
}


// ═══════════════════════════════════════════════
//  SIGN UP LOGIC
// ═══════════════════════════════════════════════
const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
  signupBtn.addEventListener('click', function () {

    const username        = document.getElementById('signup-username').value.trim();
    const email           = document.getElementById('signup-email').value.trim();
    const password        = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

    hideError('signup-error');

    if (!username || !email || !password || !confirmPassword) {
      showError('signup-error', 'All fields are required. Please fill in every field.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      showError('signup-error', 'Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      showError('signup-error', 'Passwords do not match. Please try again.');
      return;
    }
    if (password.length < 6) {
      showError('signup-error', 'Password must be at least 6 characters long.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.find(function (user) {
      return user.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
      showError('signup-error', 'An account with this email already exists. Please log in.');
      return;
    }

    existingUsers.push({ username, email: email.toLowerCase(), password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    const formCard = document.getElementById('form-card');
    if (formCard) { formCard.classList.add('hidden'); }

    const successCard = document.getElementById('success-card');
    if (successCard) { successCard.classList.remove('hidden'); }

    let timeLeft = 5;
    const countdownEl = document.getElementById('countdown-number');
    const progressBar = document.getElementById('progress-bar');

    const timer = setInterval(function () {
      timeLeft--;
      if (countdownEl) { countdownEl.textContent = timeLeft; }
      if (progressBar) { progressBar.style.width = (timeLeft * 20) + '%'; }
      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = 'login.html';
      }
    }, 1000);
  });
}


// ═══════════════════════════════════════════════
//  LOGIN LOGIC
// ═══════════════════════════════════════════════
const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', function () {

    const email    = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();

    hideError('login-error');

    if (!email || !password) {
      showError('login-error', 'Both email and password are required.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      showError('login-error', 'Please enter a valid email address.');
      return;
    }

    const savedUsers  = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = savedUsers.find(function (user) {
      return (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password             === password
      );
    });

    if (!matchedUser) {
      showError('login-error', 'Invalid email or password. Please try again.');
      return;
    }

    localStorage.setItem('currentUser',     matchedUser.email);
    localStorage.setItem('currentUsername', matchedUser.username.toUpperCase());
    window.location.href = '../../index.html';
  });
}


// ═══════════════════════════════════════════════
//  ROUTE PROTECTION
// ═══════════════════════════════════════════════
function protectPage() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
  }
}


// ═══════════════════════════════════════════════
//  LOGOUT
// ═══════════════════════════════════════════════
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentUsername');
  window.location.href = 'login.html';
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}