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
        setSuspectData(suspect);
        setSuspectClusters(suspect.k_clusters);
        setSuspectClustersSim(suspect.k_clusters_similarity);
        setIsLoading(false);
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
        <h1 className="text-2xl font-bold">Details for Suspect {suspectId.replace('suspect_','')}</h1>
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
          {suspectClusters.map((_, item) => (
            <TableRow>
              <TableCell>{suspectClusters[item]}</TableCell>
              <TableCell>{suspectClustersSim[item]}</TableCell>
              <TableCell>
                <Button onClick={()=> navigate(`/cluster/${jobId}/${suspectClusters[item]}`)}>View Cluster</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
