import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockGalleryData } from './mockGalleryData';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from '../components/ui/button';

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  const [minutes, seconds] = timestamp.split(':').slice(1);
  const totalSeconds = parseFloat(minutes) * 60 + parseFloat(seconds);
  return `${totalSeconds.toFixed(1)}s`;
};

export default function ClusterDetailPage() {
  const { jobId, clusterId } = useParams();
  const navigate = useNavigate();
  const [clusterData, setClusterData] = useState(null);

  useEffect(() => {
    // In a real app, you'd fetch the specific cluster data here
    // For now, we'll filter it from our mock data
    const cluster = mockGalleryData.data.clusters.find(c => c.id.toString() === clusterId);
    setClusterData(cluster);
  }, [clusterId]);

  if (!clusterData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(`/gallery/${jobId}`);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Cluster {clusterId} Details</h1>
        <Button onClick={handleBack}>Back to Clusters</Button>
      </div>
      <Table>
        <TableCaption>A list of intervals for this cluster.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Video ID</TableHead>
            <TableHead>Frame Interval</TableHead>
            <TableHead>Timestamp Interval</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clusterData.items[0].intervals.map((interval, index) => (
            <TableRow key={index}>
              <TableCell>{clusterData.items[0].id}</TableCell>
              <TableCell>{interval.frame_interval.join(' - ')}</TableCell>
              <TableCell>
                {formatTimestamp(interval.timestamp_interval[0])} - {formatTimestamp(interval.timestamp_interval[1])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
