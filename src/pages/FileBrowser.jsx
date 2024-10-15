import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Button } from '../components/ui/button';

export function FileBrowser() {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResources, setSelectedResources] = useState([]); // To store selected files across navigation
  const navigate = useNavigate();
  const location = useLocation();
  const folderPath = location.pathname.replace('/select', ''); // Current folder path

  const { mode } = location.state || {};
  let view = ''
  let extensions = []

  // Create Gallery
  if (mode==="gallery") { 
    extensions = ['.mp4', '.mov', '.avi'];
    view = 'input'

    // Extract Individual Select Videos
  } else if (mode==="individual-videos") { 
    extensions = ['.mp4', '.mov', '.avi'];
    view = 'input'

    // Extract Individual Select Suspect --> mode==="individual-images"
  } else{
    extensions = ['.jpg', '.jpeg', '.png'];
    view = 'media'
  }

  const validExtensions = extensions 
  const nginxView = view 

  useEffect(() => {
    const fetchDirectory = async () => {
      setIsLoading(true);
      try {
        const baseUrl = folderPath
          ? `http://10.41.41.112:8080/${nginxView}/${folderPath}`
          : `http://10.41.41.112:8080/${nginxView}/`;

        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch directory data');
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const links = Array.from(doc.querySelectorAll('a'))
          .map(link => {
            const href = link.getAttribute('href');
            const textContent = link.nextSibling?.textContent.trim();
            const [date, size] = textContent ? textContent.split(/\s{2,}/) : ['', '-'];
            
            if (href && href !== '../') {
              const isDirectory = href.endsWith('/');
              return {
                name: href,
                type: isDirectory ? 'directory' : 'file',
                date,
                size,
              };
            }
            return null;
          })
          .filter(Boolean);

        setFiles(links);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching directory data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchDirectory();
  }, [mode, nginxView, folderPath]);

  const handleRowClick = (item) => {
    if (item.type === 'directory') {
      const cleanPath = `/select/${folderPath ? `${folderPath}/` : ''}${item.name}`.replace(/\/{2,}/g, '/');
      navigate(cleanPath);
    }
  };

  const handleDragStart = (e, item) => {
    const fileInfo = {
      name: item.name,
      path: `${folderPath ? `${folderPath}/` : ''}${item.name}`, // Keep only the folder-relative path
      date: item.date,
      size: item.size,
    };
    e.dataTransfer.setData('application/json', JSON.stringify(fileInfo));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fileInfo = JSON.parse(e.dataTransfer.getData('application/json'));
    if (!selectedResources.some(file => file.path === fileInfo.path)) {
      setSelectedResources([...selectedResources, fileInfo]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleRemoveFile = (filePath) => {
    setSelectedResources(selectedResources.filter(file => file.path !== filePath));
  };

  const handleGoBack = () => {
    const segments = folderPath.split('/').filter(Boolean); // Break folderPath into segments
    if (segments.length > 1) {
      const newPath = segments.slice(0, segments.length - 1).join('/');
      navigate(`/select/${newPath}/`);
    } else {
      navigate('/select');
    }
  };

  const navigatePrevious = () => {
    navigate('/select', { state: { mode: 'individual-videos' } });
  };
  
  const navigateNext = () => {
    navigate('/select', { state: { mode: 'individual-images'} });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const prefix = import.meta.env.VITE_MOUNTED_DIR;

    if (mode==='gallery') {
      const filteredPaths =  selectedResources
      .map(file => `${prefix}/input/${file.path}`.replace(/\/{2,}/g, '/')); // Add the prefix

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
    } else {
      try {1    
          // Define video and image extensions
        const videoExtensions = ['.mp4', '.mov', '.avi'];
        const imageExtensions = ['.jpg', '.jpeg', '.png'];

          
        // Separate videos and images into different lists
        const videoPaths = selectedResources.filter(video =>
          videoExtensions.some(ext => video.name.toLowerCase().endsWith(ext))
        )
        .map(video => `${prefix}/input/${video.path}`.replace(/\/{2,}/g, '/')); 

        const imagePaths = selectedResources.filter(file =>
          imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
        ).map(file => `${prefix}/output/${file.path}`.replace(/\/{2,}/g, '/')); 


        const response = await fetch(`${import.meta.env.VITE_API_URL}/search_suspect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video_paths: videoPaths, suspect_paths: imagePaths }),
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
    }
    
  };

  const hanhlePRINT = () => {
    console.log(selectedResources)
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full py-10">
      {/* Buttons */}
      <div className="flex items-center space-x-4">        
        <button
          onClick={handleGoBack}
          disabled={!folderPath} // Disable if at root
          className={`px-4 py-2 text-white rounded ${
            !folderPath ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Go Back
        </button>

        <button
          onClick={handleSubmit}
          className={`px-4 py-2 text-white rounded ${
            mode === 'individual-videos' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={mode === 'individual-videos'}
          style={{ marginLeft: '1em' }}
        >
          Submit
        </button>


        {mode === 'individual-videos' && (
          <button
            onClick={navigateNext}
            className="px-4 py-2 bg-blue-500 bg-green-500 text-white rounded hover:bg-green-600"
            style={{ marginLeft: '1em' }}
          >
            Go to Suspect Images
          </button>
        )}

        {mode === 'individual-images' && (
          <button
            onClick={navigatePrevious}
            className="px-4 py-2 bg-blue-500 bg-green-500 text-white rounded hover:bg-green-600"
            style={{ marginLeft: '1em' }}
          >
            Go back to Select Videos
          </button>
        )}
      </div>
    <br></br>

    <div className="flex w-full"> {/* Full width flex container */}
      {/* Left Table (File Browser) */}
      <div className="flex-1 pr-4"> {/* Use flex-1 to share space equally */}

        <div className="max-h-96 w-full overflow-y-auto overflow-x-auto">
          <h1 className="text-2xl font-bold">List of Resources</h1>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b text-left">Grab</th>
                <th className="py-3 px-6 border-b text-left">Name</th>
                <th className="py-3 px-6 border-b text-left">Date</th>
                <th className="py-3 px-6 border-b text-left">Size</th>
                <th className="py-3 px-6 border-b text-left">Preview</th>
              </tr>
            </thead>
            <tbody>
              {files &&
                files
                  .filter((item) => {
                    // Always show directories
                    if (item.type === 'directory') {
                      return true;
                    }
                    return validExtensions.some((ext) => item.name.toLowerCase().endsWith(ext));
                  })
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-100"
                      draggable={item.type === 'file'}
                      onDragStart={(e) => handleDragStart(e, item)}
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="py-2 px-4 border-b">
                        {item.type === 'file' && (
                          <span className="cursor-move">⋮⋮</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.type === 'directory' ? '📁' : '📄'} {item.name}
                      </td>
                      <td className="py-2 px-4 border-b">{item.date || '-'}</td>
                      <td className="py-2 px-4 border-b">{item.size || '-'}</td>
                      <td className="py-2 px-4 border-b">
                        {item.type === 'file' && item.name.endsWith('.jpg') ? (
                          <img
                            src={`http://10.41.41.112:8080/${nginxView}/${folderPath ? `${folderPath}/` : ''}${item.name}`}
                            alt={item.name}
                            style={{ width: '50px' }}
                          />
                        )  : item.type === 'file' && (item.name.endsWith('.mp4') || item.name.endsWith('.mov') || item.name.endsWith('.avi')) ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">Show Video</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Video Preview</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4">
                                <video controls autoPlay className="w-full h-auto">
                                  <source src={`http://10.41.41.112:8080/${nginxView}/${folderPath ? `${folderPath}/` : ''}${item.name}`} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span>-</span>
                         )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Table (Selected Files) */}
      <div className="flex-1 pr-4" onDrop={handleDrop} onDragOver={handleDragOver}> {/* Use flex-1 to share space equally */}
        <div className="max-h-96 w-full overflow-y-auto overflow-x-auto">
          <h1 className="text-2xl font-bold">Selected Resources</h1>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b text-left">File Name</th>
                <th className="py-3 px-6 border-b text-left">Preview</th>
                <th className="py-3 px-6 border-b text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {selectedResources && selectedResources.map((file, index) => (
                <tr key={index} className="cursor-default">
                  <td className="py-3 px-6 border-b">{file.name || 'Unnamed File'}</td> {/* Safeguard against undefined name */}
                  <td className="py-3 px-6 border-b">
                    {file.name && file.name.endsWith('.jpg') ? (
                      <img
                        src={`http://10.41.41.112:8080/${nginxView}/${file.path}`}
                        alt={file.name}
                        style={{ width: '80px' }} // Larger image preview
                      />
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Show Video</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Video Preview</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <video controls autoPlay className="w-full h-auto">
                              <source src={`http://10.41.41.112:8080/${nginxView}/${folderPath ? `${folderPath}/` : ''}${file.name}`} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </td>
                  <td className="py-3 px-6 border-b">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleRemoveFile(file.path)}  // Call the remove handler
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  );
}
