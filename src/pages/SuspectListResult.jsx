import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export function SuspectListResult() {
  const [suspectData, setSuspectData] = useState(null);
  const [clusterData, setClusterData] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
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
        console.log(data)
        setSuspectData(data.data.suspects);
        setClusterData(data.data.clusters);

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

//   const handleRowClick = (folderName, suspect) => {
//     navigate(`./suspect_${folderName}`,  {
//       state: {
//         suspectData: suspect
//       }
//     });
//   };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRowClick = (id) => {
    // If the row is already expanded, collapse it; otherwise, expand it
    setExpandedRow(expandedRow === id ? null : id);
    console.log(id)
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Suspects Identified Across Multiple Media</h1>
      <table className="min-w-full bg-white border border-gray-200 table-fixed">
        <tbody>
          {suspectData && suspectData.map((suspect, index) => (
            <React.Fragment key={suspect.id}>
              {/* Main row */}
              <tr
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(suspect.id)}
              >
                {/* <td className="py-3 px-6 border-b">{row.id}</td> */}
                <td className="py-3 px-6 border-b">Suspect {index}</td>
              </tr>

              {/* Dropdown row */}
              {expandedRow === suspect.id && (
                <tr>
                  <td colSpan="2" className="py-3 px-6 border-b bg-gray-50">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {suspect.k_clusters.map((clusterId, index) => {
                        // Find the corresponding cluster by its ID
                        const cluster = clusterData.find((cluster) => cluster.id === clusterId);

                        // Ensure the cluster exists before rendering
                        if (cluster) {
                        return (
                            <div key={cluster.id} className="group relative overflow-hidden rounded-lg">
                            <Link 
                                to={`/cluster/${jobId}/${cluster.id}`}
                                className="group relative overflow-hidden rounded-lg"
                            >
                                <img
                                src={`${import.meta.env.VITE_NGINX}/${jobId}/${cluster.id}/${cluster.thumbnail}`}
                                alt={`Cluster ${cluster.id}`}
                                width={400}
                                height={400}
                                className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <h3 className="text-lg font-semibold text-white">
                                        Cluster {cluster.id}
                                    </h3>
                                    <p className="text-lg font-semibold text-white"> Similarity: {'\n\n\n\n\n\n'}</p>
                                    <p className="text-lg font-semibold text-white">
                                        {suspect.k_clusters_similarity[index].toFixed(5)}
                                    </p>
                                </div>
                            </Link>
                            </div>
                        );
                        }

                        // Return null if no cluster is found
                        return null;
                    })}
                        </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>

  )};