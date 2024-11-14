import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ListPage() {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolderList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_NGINX}/media/`);
        if (!response.ok) {
          throw new Error('Failed to fetch folder list');
        }
        const text = await response.text();

        // Parse the HTML to extract folder names
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('pre a');
        const folderList = Array.from(links)
          .map(link => link.getAttribute('href'))
          .filter(href => href !== '../' && href.endsWith('/')) // Only folders end with '/'
          .map(href => href.replace('/', '')); // Remove trailing slash

        setFolders(folderList);
      } catch (error) {
        console.error('Error fetching folder list:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolderList();
  }, []);

  const handleRowClick = (folderName) => {
    navigate(`/gallery/${folderName}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Job ID</h1>
      <table className="min-w-full bg-white border border-gray-200">
        {/* <thead>
          <tr>
            <th className="py-2 px-4 border-b">Gallery ID</th>
          </tr>
        </thead> */}
        <tbody>
          {folders.map((folder, index) => (
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(folder)}
            >
              <td className="py-2 px-4 border-b">{folder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
