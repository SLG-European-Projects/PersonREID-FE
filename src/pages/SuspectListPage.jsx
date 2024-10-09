import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockGalleryData } from './mockGalleryData';
import { mockSuspectData } from './mockSuspectData';

export function SuspectListPage() {
  const [suspectData, setSuspectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuspectData = async () => {
      setIsLoading(true);
      try {
        //Uncomment the following lines when ready to use the real API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job_result/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch suspect list data');
        }
        
        const dataString = await response.json();
        const data = JSON.parse(dataString);  // Parse the JSON string into an object

        setSuspectData(data.data.suspects);

        // //For now, use mock data
        //   setTimeout(() => {
        //   setSuspectData(mockSuspectData.data.suspects);
        //   setIsLoading(false);
        //   console.info('mock data:', mockSuspectData.data.suspects)
        // }, 500);
 
        setIsLoading(false);
       
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSuspectData();
  }, [jobId]);

  const handleRowClick = (folderName, suspect) => {
    navigate(`./${folderName}`,  {
      state: {
        suspectData: suspect
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
    <h1 className="text-2xl font-bold mb-4">Suspect ID</h1>
    <table className="min-w-full bg-white border border-gray-200">
     
      {/* <thead>
        <tr>
          <th className="py-2 px-4 border-b">Gallery ID</th>
        </tr>
      </thead> */}
      {/* <tbody>
      {suspectData && suspectData.map((suspect) => (
          <tr
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => handleRowClick(suspect.id)}
          >
            <td className="py-2 px-4 border-b">{suspect.id}</td>
          </tr>
        ))}
      </tbody> */}

      <tbody>
        {suspectData && suspectData.map((suspect, index) => (
          <tr
            key={index} // Always provide a key when using map in React
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => handleRowClick(`suspect_${index}`, suspect)}
          >
            <td className="py-2 px-4 border-b">{suspect.id}</td>
          </tr>
        ))}
      </tbody>
      <caption>List of Suspects Identified Across Multiple Media </caption>

    </table>
  </div>
  );
}
