# My Feed Dashboard

Welcome to **My Feed Dashboard** – a customizable React-based dashboard that aggregates and displays various feeds like weather updates, news, sports highlights, trivia, and more! This project is designed to provide an engaging and user-friendly interface with modular components for easy extension and scalability.

## 🖥️ Features
- **Weather Updates**: Displays real-time weather information with beautiful icons.
- **News Feed**: Stay updated with the latest headlines.
- **Reddit Integration**: View top posts from your favorite subreddits.
- **Quote of the Day (QotD)**: Get inspired by daily quotes.
- **Picture of the Day (PotD)**: Visual treats with daily curated pictures.
- **Trivia**: Test your knowledge with fun trivia questions.
- **Task Manager**: Keep track of your tasks and to-dos.

## 📂 Project Structure
Here’s an overview of the key folders and files in the project:

```
my-dashboard/
│
├── public/                # Static files
├── src/
│   ├── assets/            # Images and icons
│   │   ├── weather-icons/ # Weather-related SVG icons
│   │   ├── news-fb.jpg    # News placeholder image
│   │   └── reddit-logo.svg # Reddit logo
│   ├── components/        # Application components
│   │   ├── Dashboard/     # Main dashboard component
│   │   ├── Navbar/        # Top navigation bar
│   │   ├── Weather/       # Weather module
│   │   ├── News/          # News module
│   │   ├── Potd/          # Picture of the Day module
│   │   ├── Qotd/          # Quote of the Day module
│   │   ├── Reddit/        # Reddit feed module
│   │   ├── Sports/        # Sports module
│   │   ├── Task/          # Task manager module
│   │   ├── Trivia/        # Trivia module
│   │   └── Welcome/       # Welcome screen module
│   ├── context/           # React context for state management
│   ├── data/              # Static data (e.g., trivia questions)
│   │   ├── generalTrivia.json # General trivia data
│   │   └── spaceTrivia.json   # Space-themed trivia data
│   ├── App.js             # Root component
│   ├── App.scss           # Root styling file
│   ├── index.js           # Application entry point
│   ├── styles.scss        # Global styles
│   └── logo.svg           # Application logo
│
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
└── README.md              # Project documentation
```

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-feed-dashboard.git
   cd my-feed-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Build for Production
To create a production build of the app:
```bash
npm run build
# or
yarn build
```
The optimized build will be output to the `build/` folder.

---

## 🛠️ Customization

Each feature in the dashboard is modular and easy to customize. Here’s how to modify or add new features:

- **Adding a New Module**:
  1. Create a new folder in `src/components/` with the name of your module.
  2. Add two files:
     - `YourModule.jsx` (for the component logic and structure)
     - `YourModule.scss` (for styling)
  3. Import and integrate the new module into `Dashboard.jsx`.

- **Updating Data**:
  - Static data for trivia questions can be modified in `src/data/generalTrivia.json` or `src/data/spaceTrivia.json`.
  - Replace placeholder assets like icons or images in the `src/assets/` folder.

- **Integrating APIs**:
  - Use libraries like `axios` to fetch real-time data and populate your modules dynamically.

## 📦 Dependencies

This project utilizes the following key libraries:
- [**React**](https://reactjs.org/): Component-based UI framework.
- [**React Context API**](https://react.dev/reference/context): For state management.
- [**SASS**](https://sass-lang.com/): For styling with `.scss` files.
- [**Axios**](https://axios-http.com/): For making HTTP requests.
- [**FontAwesome**](https://fontawesome.com/): For icons.

## 🖋️ License
This project is licensed under the [MIT License](LICENSE).

---