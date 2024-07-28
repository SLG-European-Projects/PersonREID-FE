import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Progress } from "../components/ui/progress";

// Mock function to simulate progress
const mockFetchProgress = (currentProgress) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Increase by 0-20%, but never decrease and cap at 100%
      const increase = Math.floor(Math.random() * 21); // 0-20
      const newProgress = Math.min(currentProgress + increase, 100);
      resolve(newProgress);
    }, 1000); // Simulate network delay
  });
};

export function SuccessPage() {
  const [progress, setProgress] = useState(0);

  const fetchProgress = useCallback(async () => {
    try {
      const progressValue = await mockFetchProgress(progress);
      setProgress(progressValue);

      // Uncomment and use this when the real API is ready
      // const response = await fetch(`${import.meta.env.VITE_JOB_PROGRESS_URL}`);
      // const data = await response.json();
      // setProgress(prevProgress => Math.max(prevProgress, data.progress)); // Ensure progress never decreases
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  }, [progress]); // Include progress in the dependency array

  useEffect(() => {
    const intervalId = setInterval(fetchProgress, 2000); // Poll every 2 seconds

    // Stop polling when progress reaches 100%
    if (progress === 100) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [fetchProgress, progress]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">Gallery Creation in Progress</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Please wait while we create your gallery. You'll be able to view and manage the results once it's complete.
        </p>
        <div className="text-center">
          <div className="py-4">
            <Progress value={progress} />
          </div>
          <p>Progress: {progress}%</p>
          {progress === 100 && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-4">Gallery Created Successfully!</h2>
              <Link to="/create-gallery" className="text-blue-500 hover:underline">
                Create Another Gallery
              </Link>
            </>
          )}
        </div>
        <div className="mt-6">
          <Link
            to="/gallery"
            className={`inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              progress < 100 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => progress < 100 && e.preventDefault()}
          >
            Show Results
          </Link>
        </div>
      </div>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
