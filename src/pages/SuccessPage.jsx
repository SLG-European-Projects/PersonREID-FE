import { Link, useLocation } from "react-router-dom"

export function SuccessPage() {
  const location = useLocation();
  const { jobId } = location.state || {};
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">Success!</h1>
        <p className="mt-3 text-lg text-muted-foreground">
        You can now view and manage the final results by clicking the button below and results will be also available for download or save
        </p>
        <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Gallery Created Successfully!</h1>
      {jobId && <p className="mb-4">Job ID: {jobId}</p>}
      <Link to="/create-gallery" className="text-blue-500 hover:underline">
        Create Another Gallery
      </Link>
    </div>
        <div className="mt-6">
          <Link
            to="/gallery"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Show Results
          </Link>
        </div>
      </div>
    </div>
  )
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
  )
}


// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }
