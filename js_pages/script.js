
//  HELPERS
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

//  SIGN UP LOGIC
const signupBtn = document.getElementById('signup-btn');
if (signupBtn) {
  signupBtn.addEventListener('click', function () {

    // Read and trim all field values
    const username        = document.getElementById('signup-username').value.trim();
    const email           = document.getElementById('signup-email').value.trim();
    const password        = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

    // Hide any previous error
    hideError('signup-error');

    // Validate — check no field is empty
    if (!username || !email || !password || !confirmPassword) {
      showError('signup-error', 'All fields are required. Please fill in every field.');
      return;
    }

    // Validate — basic email format check using .includes()
    if (!email.includes('@') || !email.includes('.')) {
      showError('signup-error', 'Please enter a valid email address.');
      return;
    }

    // Validate — passwords must match
    if (password !== confirmPassword) {
      showError('signup-error', 'Passwords do not match. Please try again.');
      return;
    }

    // Validate — password must be at least 6 characters
    if (password.length < 6) {
      showError('signup-error', 'Password must be at least 6 characters long.');
      return;
    }

    // Read existing users from localStorage (or start with empty array)
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email is already registered
    const emailExists = existingUsers.find(function (user) {
      return user.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExists) {
      showError('signup-error', 'An account with this email already exists. Please log in.');
      return;
    }

    // Create new user object and save to localStorage
    const newUser = {
      username: username,
      email:    email.toLowerCase(),
      password: password,
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // 
    // hidden card
    const formCard = document.getElementById('form-card');
    if (formCard) {
      formCard.classList.add('hidden');
    }

    // success message
    const successCard = document.getElementById('success-card');
    if (successCard) {
      successCard.classList.remove('hidden');
    }

    // count down bar
    let timeLeft = 5;
    const countdownEl  = document.getElementById('countdown-number');
    const progressBar  = document.getElementById('progress-bar');

    const timer = setInterval(function () {
      timeLeft--;

      // Update the countdown number
      if (countdownEl) {
        countdownEl.textContent = timeLeft;
      }

      if (progressBar) {
        progressBar.style.width = (timeLeft * 20) + '%';
      }

      
      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = 'login.html';
      }

    }, 1000);

  });
}

//  LOGIN LOGIC

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', function () {

    // Read and trim field values
    const email    = document.getElementById('email-input').value.trim();
    const password = document.getElementById('password-input').value.trim();

    // Hide any previous error
    hideError('login-error');

    // Validate — check no field is empty
    if (!email || !password) {
      showError('login-error', 'Both email and password are required.');
      return;
    }

    // Validate — basic email format
    if (!email.includes('@') || !email.includes('.')) {
      showError('login-error', 'Please enter a valid email address.');
      return;
    }

    // Read saved users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find a user matching email AND password
    const matchedUser = savedUsers.find(function (user) {
      return (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password             === password
      );
    });

    // No match — show error
    if (!matchedUser) {
      showError('login-error', 'Invalid email or password. Please try again.');
      return;
    }

    // Save session to localStorage
    localStorage.setItem('currentUser', matchedUser.email);
    localStorage.setItem('currentUsername', matchedUser.username.toUpperCase());

    // Redirect to homepage
    window.location.href = '../../index.html';
  });
}

//  ROUTE PROTECTION

function protectPage() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
  }
}

//  LOGOUT
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentUsername');
  window.location.href = 'login.html';
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}