import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockSuspectData } from './mockSuspectData';
import { useLocation } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";
  import { Button } from '../components/ui/button';
  
export function SuspectDetailPage() {
  const [suspectData, setSuspectData] = useState(null);
  const location = useLocation();

  const [suspectClusters, setSuspectClusters] = useState(null);
  const [suspectClustersSim, setSuspectClustersSim] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId, suspectId } = useParams();
  const navigate = useNavigate();
  const suspect =  location.state.suspectData || {}; // Access the passed state

  useEffect(() => {
    const fetchSuspectData = async () => {
      setIsLoading(true);
      try {
        // Uncomment the following lines when ready to use the real API
        // const response = await fetch(`${import.meta.env.VITE_NGINX}/${jobId}/${suspectId}/`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch suspect data');
        // }
        
        // const dataString = await response.json();
        // const data = JSON.parse(dataString);  // Parse the JSON string into an object
        //const data = mockSuspectData;

        // const suspect = data.data.suspects.find(c => c.id.toString() === suspectId);
        
        setSuspectData(suspect);
        setSuspectClusters(suspect.k_clusters);
        setSuspectClustersSim(suspect.k_clusters_similarity);
        setIsLoading(false);


        // For now, use mock data
        //   setTimeout(() => {
        //   console.info('mock data:', suspect);
        //   setSuspectData(suspect);
          
        //   console.info('mock data 2:', suspect.k_clusters);
        //   setSuspectClusters(suspect.k_clusters);
        //   console.info('mock data 3:', suspect.k_clusters_similarity);
        //   setSuspectClustersSim(suspect.k_clusters_similarity);

        //   setIsLoading(false);
        // }, 500);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSuspectData();
  }, [jobId, suspectId]);

  const handleBack = () => {
    navigate(`/reid/${jobId}`);
  };

  const handleViewCLuster = (clusterId) => {
    navigate(`/cluster/${jobId}/${clusterId}`);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!suspectData) return <div>No data found for this suspect.</div>;

  return (
<div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Details for: {suspectId}</h1>
        <Button onClick={handleBack}>Back to Suspects</Button>
      </div>
      <Table>
        <TableCaption>A list of similarity per cluster for this suspect.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cluster ID</TableHead>
            <TableHead>Cluster Similarity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suspectClusters.map((index, item) => (
            <TableRow>
              <TableCell>{suspectClusters[item]}</TableCell>
              <TableCell>{suspectClustersSim[item]}</TableCell>
              <TableCell>
                <Button onClick={()=> navigate(`/cluster/${jobId}/${suspectClusters[item]}`)}>View CLuster</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
