

```markdown
# 🎬 Movie Watch List & Streaming Website

A modern frontend movie web application that allows users to browse movies, view details, and watch trailers.

Built using:

* **HTML5**
* **Tailwind CSS v4.2 (CLI)**
* **JavaScript (Basic: strings & simple logic)**

---

## 📌 Features

* 🔐 Simulated Authentication (username prompt)
* 🎥 Movie Listing Page
* 📄 Movie Details Page
* ▶️ Movie Streaming (YouTube/video)
* 🎨 Dark-themed UI
* 📱 Responsive layout

---

## 🛠️ Tech Stack

* HTML5
* Tailwind CSS v4.2 (CLI)
* JavaScript (Basic)

---

## 🎨 UI Design (Cinematic Dark Theme)

| Element        | Color / Tailwind Class |
| -------------- | -------------------- |
| Background     | `#0f0f0f` / `bg-gray-900` |
| Cards/Navbar   | `#1c1c1c` / `bg-gray-800` |
| Accent         | `#e50914` / `bg-red-600 hover:bg-red-700` |
| Text Primary   | `#ffffff` / `text-white` |
| Text Secondary | `#b3b3b3` / `text-gray-400` |
| Highlight/Hover| `ring-red-500 hover:ring-2` |
| Links/Nav      | `text-red-500 hover:text-red-600` |

---

## 📁 Project Structure

```

Movie_watch_list/
├── node_modules/                 # Installed dependencies
├── package.json                  # Project metadata & dependencies
├── package-lock.json             # Lock file for exact versions
├── README.md                     # Project documentation
└── src/                          # Source files
├── input.css                 # Tailwind input CSS
├── output.css                # Tailwind compiled CSS
├── script.js                 # Main JavaScript logic
└── pages/                    # HTML pages
├── index.html            # Home / movie listing
├── movies.html           # Movie list / category page
└── details.html          # Movie detail & player page

````

> ✅ Notes: All JS logic goes into `script.js`. All HTML pages are inside `src/pages/`. Tailwind input/output is in `src/`. This matches Tailwind CLI 4.2 workflow.

---

## ⚙️ Installation & Setup

### 1️⃣ Install Node.js
Download & install Node.js: [https://nodejs.org/](https://nodejs.org/)

Verify installation:

```bash
node -v
npm -v
````

### 2️⃣ Initialize Project

```bash
npm init -y
```

### 3️⃣ Install Tailwind CSS v4.2 CLI

```bash
npm install tailwindcss @tailwindcss/cli
```

### 4️⃣ Create Tailwind Input File

Create `src/input.css` and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5️⃣ Compile Tailwind CSS

```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### 6️⃣ Include CSS & JS in HTML Pages

```html
<link href="../output.css" rel="stylesheet">
<script src="../script.js"></script>
```

---

## 🚀 Running the Project

1. Start Tailwind CLI watcher:

```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

2. Open `index.html` in your browser

---

## 🔑 Authentication (Simulated)

```javascript
let username = prompt("Enter your username:");

if (username) {
  alert("Welcome " + username.toUpperCase());
}
```

---

## 🎬 Movie Listing Page

Displays movies in card format with:

* Poster
* Title
* Description
* “View Details” button

---

## 📄 Movie Details Page

Includes:

* Movie title
* Full description
* Embedded video player

```html
<iframe width="100%" height="315" src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

---

## 🤝 Team Collaboration & Git Workflow

### Roles

| Role           | Responsibility     |
| -------------- | ------------------ |
| HTML Developer | Page structure     |
| CSS Developer  | Styling & layout   |
| JS Developer   | Basic interactions |

### Git Workflow

1. **Create a branch**

```bash
git checkout -b feature/<your-feature>
```

2. **Make changes & commit**

```bash
git add .
git commit -m "feat: add login form functionality"
```

3. **Push branch to remote**

```bash
git push origin feature/<your-feature>
```

4. **Open Pull Request** on GitHub and assign reviewers

5. **Sync with main branch**

```bash
git checkout main
git pull origin main
git checkout feature/<your-feature>
git merge main
git push origin feature/<your-feature>
```

---

## 🚀 Future Improvements

* Real authentication system
* Backend integration
* API-based movie data
* Advanced JavaScript

---

## ⚠️ Limitations

* No backend
* Static data
* Simulated login only

---

## 📄 License

This project is for educational purposes only.

```


