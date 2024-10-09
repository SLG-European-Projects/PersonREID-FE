import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { toast } from 'react-hot-toast';

export function CreateGalleryPage() {
  const [videoPaths, setVideoPaths] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddPath = () => {
    setVideoPaths([...videoPaths, '']);
  };

  const handlePathChange = (index, value) => {
    const newPaths = [...videoPaths];
    newPaths[index] = value;
    setVideoPaths(newPaths);
  };

  const handleRemovePath = (index) => {
    const newPaths = videoPaths.filter((_, i) => i !== index);
    setVideoPaths(newPaths.length ? newPaths : ['']);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const prefix = import.meta.env.VITE_MOUNTED_DIR;

    const filteredPaths =  videoPaths
      .filter(path => path.trim() !== '') // Filter out empty paths
      .map(path => `${prefix}/input/${path}`); // Add the prefix

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create_gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_paths: filteredPaths }),
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
            placeholder="Enter video path relative to input directory (ex. 'sample_video.mp4')"
            className="flex-grow mr-2"
          />
          {videoPaths.length > 1 && (
            <Button type="button" onClick={() => handleRemovePath(index)}>Remove</Button>
          )}
        </div>
      ))}
      <div className="flex gap-3">
        <Button type="button" onClick={handleAddPath}>Add Another Path</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Start Extraction'}
        </Button>
      </div>
    </form>
  );
}
