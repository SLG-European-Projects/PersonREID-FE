import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { mockGalleryData } from './mockGalleryData';

export function GalleryPage() {
  const [galleryData, setGalleryData] = useState(null);
  const [suspectData, setSuspectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsLoading(true);
      try {
        // Uncomment the following lines when ready to use the real API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/job_result/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        
        const dataString = await response.json();
        const data = JSON.parse(dataString);  // Parse the JSON string into an object

        //const suspects = data.data.suspects;
        
        setGalleryData(data.data.clusters);
        setSuspectData(data.data.suspects);

 
        setIsLoading(false);


        // For now, use mock data
        // setTimeout(() => {
        //   setGalleryData(mockGalleryData.data.clusters);
        //   setIsLoading(false);
        // }, 500);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, [jobId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      {suspectData ? <Navigate to={`/reid/${jobId}`}/> : null}
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore Identified Persons
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            You can view all clusters or download individual cluster
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {galleryData && galleryData.map((cluster) => (
            <div key={cluster.id} className="group relative overflow-hidden rounded-lg">

  

          <Link 
            key={cluster.id} 
            to={`/cluster/${jobId}/${cluster.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
         
              <img
                // Use local file system path for development
                // src={`${import.meta.env.VITE_LOCAL_THUMBNAIL_PATH}/${cluster.thumbnail}`}
                // src={`${cluster.thumbnail}`}
                
                // Commented code for server deployment
                // src={`${import.meta.env.VITE_SERVER_THUMBNAIL_URL}/${cluster.thumbnail}`}
                src={`${import.meta.env.VITE_NGINX}/${jobId}/${cluster.id}/${cluster.thumbnail}`}               
                
                alt={`Cluster ${cluster.id}`}
                width={400}
                height={400}
                className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-lg font-semibold text-white">
                  Cluster {cluster.id}
                </h3>
              </div>
			</Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
