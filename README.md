# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Person re id  App

This is a React application built with Vite. It uses React Router for navigation and Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/)
* You have a Windows/Linux/Mac machine.

## Installing Person re id App

To install the person re id App, follow these steps:

1. Clone the repository
   ```
   git clone https://github.com/your-username/<git-repo>
   ```
2. Navigate to the project directory
   ```
   cd <project name>
   ```
3. Install the dependencies
   ```
   npm install
   ```
4. Run the App
   ```
   npm run dev
   ```

## Configuring the App

1. The app expects a backend API running at `http://localhost:9090`. If your API is running on a different URL, you need to update it in the `CreateGalleryForm.jsx` file.

2. If you're using environment variables, create a `.env` file in the root directory and add your API URL:
   ```
   VITE_API_URL=http://your-api-url
   VITE_JOB_PROGRESS_URL=http://your-api-url/job_progress
   ```
   Then update the fetch call in `CreateGalleryPage.jsx` to use:
   ```javascript
   `${import.meta.env.VITE_API_URL}/create_gallery`
   `${import.meta.env.VITE_JOB_PROGRESS_URL}`
   ```

## Running Gallery Creation App

To run Gallery Creation App, follow these steps:

1. Start the development server
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal)

## Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `dist` folder with your compiled app.

## Project Structure

- `src/App.jsx`: The main component that sets up routing
- `src/Layout.jsx`: The shared layout component
- `src/pages/`: Contains all the page components
  - `HomePage.jsx`
  - `CreateGalleryPage.jsx`
  - `SuccessPage.jsx`
  - `GalleryPage.jsx`

