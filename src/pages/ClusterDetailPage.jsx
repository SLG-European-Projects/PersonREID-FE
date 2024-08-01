import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { mockGalleryData } from './mockGalleryData';

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

// Helper functions remain the same
const formatTimestamp = (timestamp) => {
  const [minutes, seconds] = timestamp.split(':').slice(1);
  const totalSeconds = parseFloat(minutes) * 60 + parseFloat(seconds);
  return `${totalSeconds.toFixed(1)}s`;
};

const checkFileExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};

export default function ClusterDetailPage() {
  const { jobId, clusterId } = useParams();
  const navigate = useNavigate();
  const [clusterData, setClusterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClusterData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job_result/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cluster data');
        }
        const dataString = await response.json();
        const data = JSON.parse(dataString);
        const cluster = data.data.clusters.find(c => c.id.toString() === clusterId);

        const updatedIntervals = await Promise.all(
          cluster.items[0].intervals.map(async (interval) => {
            const timestampStart = interval.timestamp_interval[0];
            const timestampEnd = interval.timestamp_interval[1];
            const videoFileName = `${cluster.items[0].id}_time_${timestampStart}-${timestampEnd}.mp4`;
            const videoUrl = `${import.meta.env.VITE_NGINX}/${jobId}/${clusterId}/clips/${videoFileName}`;
            const urlExists = await checkFileExists(videoUrl);
            return {
              ...interval,
              url: urlExists ? videoUrl : null
            };
          })
        );

        cluster.items[0].intervals = updatedIntervals;
        setClusterData(cluster);
      } catch (error) {
        console.error('Error fetching cluster data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClusterData();
  }, [jobId, clusterId]);

  const handleBack = () => {
    navigate(`/gallery/${jobId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!clusterData) return <div>No data found for this cluster.</div>;

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
            <TableHead>Video Segment</TableHead>
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
              <TableCell>
                {interval.url ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Show Video</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Video Segment</DialogTitle>
                        <DialogDescription>
                          Viewing clip from {formatTimestamp(interval.timestamp_interval[0])} to {formatTimestamp(interval.timestamp_interval[1])}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <video controls autoPlay className="w-full h-auto">
                          <source src={interval.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  'No Video'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
