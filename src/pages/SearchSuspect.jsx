import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { toast } from 'react-hot-toast';

export function SearchSuspectPage() {
  const [videoPaths, setVideoPaths] = useState(['']);
  const [suspectPaths, setSuspectPaths] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPath = () => {
    setVideoPaths([...videoPaths, '']);
  };

  const handleAddSusPath = () => {
    setSuspectPaths([...suspectPaths, '']);
  };

  const handlePathChange = (index, value) => {
    const newPaths = [...videoPaths];
    newPaths[index] = value;
    setVideoPaths(newPaths);
  };

  const handleSusPathChange = (index, value) => {
    const newPaths = [...suspectPaths];
    newPaths[index] = value;
    setSuspectPaths(newPaths);
  };

  const handleRemovePath = (index) => {
    const newPaths = videoPaths.filter((_, i) => i !== index);
    setVideoPaths(newPaths.length ? newPaths : ['']);
  };

  const handleRemoveSusPath = (index) => {
    const newPaths = suspectPaths.filter((_, i) => i !== index);
    setSuspectPaths(newPaths.length ? newPaths : ['']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const prefix = import.meta.env.VITE_MOUNTED_DIR;

    const filteredPaths =  videoPaths
      .filter(path => path.trim() !== '') // Filter out empty paths
      .map(path => `${prefix}/input/${path}`); // Add the prefix
      
    const filteredSuspectPaths =  suspectPaths
      .filter(path => path.trim() !== '') // Filter out empty paths
      .map(path => `${prefix}/output/${path}`); // Add the prefix

    //Image paths are determined by results of person extraction: user should add produced path
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search_suspect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_paths: filteredPaths, suspect_paths: filteredSuspectPaths }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Gallery created successfully', {
          description: `Job ID: ${data.job_id}`,
        });
        // Navigate to the success page with the job ID
        navigate('/success', { state: { jobId: data.job_id } });
      } else {
        throw new Error(data.message || 'Failed to create gallery');
      }
    } catch (error) {
      console.error('Error creating gallery:', error);
      toast.error('Failed to create gallery', {
        description: error.message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      
      {videoPaths.map((path, index) => (
        <div key={index} className="flex mb-3">
          <Input
            type="text"
            value={path}
            onChange={(e) => handlePathChange(index, e.target.value)}
            placeholder="Enter video path relative to the input directory (e.g., 'sample_video.mp4')"
            className="flex-grow mr-2"
          />
          {videoPaths.length > 1 && (
            <Button type="button" onClick={() => handleRemovePath(index)}>Remove</Button>
          )}
          
        </div>
      ))}
            <div className="flex gap-3">
        <Button type="button" onClick={handleAddPath}>Add Another Video Path</Button>

      </div>
      &nbsp;
      {suspectPaths.map((path, index) => (
        <div key={index} className="flex mb-3">
          <Input
            type="text"
            value={path}
            onChange={(e) => handleSusPathChange(index, e.target.value)}
            placeholder="Enter suspect image path, relative to the output directiory (e.g., 'id/cluster/sample_picture.jpg')"
            className="flex-grow mr-0"
          />
          {videoPaths.length > 1 && (
            <Button type="button" onClick={() => handleRemoveSusPath(index)}>Remove</Button>
          )}
        </div>
      ))}
      <div className="flex gap-3">
        <Button type="button" onClick={handleAddSusPath}>Add Another Suspect Image Path </Button>

      </div>
      &nbsp;
      <div className='flex gap-3'>
      <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Start Identification'}
        </Button>
      </div>
    </form>
  );
}
