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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job_result/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch suspect list data');
        }
        
        const dataString = await response.json();
        const data = JSON.parse(dataString);
        console.log(data);
        setSuspectData(data.data.suspects);
        setClusterData(data.data.clusters);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSuspectData();
  }, [jobId]);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <td className="py-3 px-6 border-b">Suspect {index}</td>
                <td>
                  <img
                    src={`http://10.41.41.112:8080/media/${suspect.path.replace('/opt/mounted_dir/output/','')}`}
                    style={{ width: '50px' }}
                    alt={`Suspect ${index}`}
                  />
                </td>
              </tr>

              {/* Expanded row */}
              {expandedRow === suspect.id && (
                <tr>
                  <td colSpan="2" className="py-3 px-6 border-b bg-gray-50">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {/* First image with suspect's image */}
                      <div className="group relative overflow-hidden rounded-lg">
                        <img
                          src={`http://10.41.41.112:8080/media/${suspect.path.replace('/opt/mounted_dir/output/','')}`}
                          alt={`Suspect ${index}`}
                          className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="text-lg font-semibold text-white">
                              Suspect {index}

                            </h3>
                          </div>
                      </div>
                      
                      {/* Remaining cluster images */}
                      {suspect.k_clusters.map((clusterId, index) => {
                        const cluster = clusterData.find((cluster) => cluster.id === clusterId);
                        if (cluster) {
                          return (
                            <div key={cluster.id} className="group relative overflow-hidden rounded-lg">
                              <Link
                                to={`/cluster/${jobId}/${cluster.id}`}
                                className="group relative overflow-hidden rounded-lg"
                              >
                                <img
                                  src={`${import.meta.env.VITE_NGINX}/media/${jobId}/${cluster.id}/${cluster.thumbnail}`}
                                  alt={`Cluster ${cluster.id}`}
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
  );
}
