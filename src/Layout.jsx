/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/create-gallery" className="hover:text-gray-300">Create Gallery</Link></li>
            <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; Person re id App</p>
      </footer>
    </div>
  );
};

export default Layout;
