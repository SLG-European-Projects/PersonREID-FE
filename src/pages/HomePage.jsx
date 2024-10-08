// import {Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Link } from "react-router-dom"
// import {
//   Breadcrumb,
//   BreadcrumbEllipsis,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../components/ui/breadcrumb"
import {Button} from "../components/ui/button"
import {Card} from "../components/ui/card"

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-4">
          <img src="/placeholder.svg" alt="Logo" className="h-10 w-10" />
          <nav className="flex space-x-4">
            <a href="#" className="text-lg font-semibold text-gray-900">
              Home
            </a>
            <a href="#" className="text-lg text-gray-600">
              Dashboard
            </a>
            <a href="#" className="text-lg text-gray-600">
              Users
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-600">
            <LanguagesIcon className="h-5 w-5" />
            <span>Language</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <SettingsIcon className="h-6 w-6 text-gray-600" />
          <BellIcon className="h-6 w-6 text-gray-600" />
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header> */}
      <main className="p-8">
        {/* <nav className="flex items-center space-x-2 text-gray-600">
          <HomeIcon className="h-5 w-5" />
          <span>Dashboard</span>
          <span>...</span>
          <span>Person-Re-ID</span>
        </nav> */}
         {/* <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/docs/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb> */}
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Person Re-identification</h1>
        <p className="mt-2 text-lg text-gray-600">
          This tool involves recognising an individual across different scenes, times, or camera views
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <LeafIcon className="h-10 w-10 text-purple-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Extract Individuals</h2>
                <p className="text-sm text-gray-600">Isolate & Catalogue</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              This step involves uploading initial images or videos where the system will detect and isolate
              individuals. It automatically creates distinct visual profiles for each person, which will be used as a
              reference in the re-identification process.
            </p>
           
            <Button asChild className="mt-6 w-full bg-purple-600 text-white">
            <Link to="/create-gallery">
              Start Extraction
              </Link>
            </Button>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-10 w-10 text-gray-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Identify Across Media</h2>
                <p className="text-sm text-gray-600">Track & Match</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              Here, you can upload new media files. The system then tracks the visual profiles extracted previously and
              matches them against the individuals in the new content, effectively re-identifying and locating
              appearances of the same individuals across different media.
            </p>
              <Button asChild className="mt-6 w-full bg-purple-600 text-white">
                <Link to="/search-suspect">
                 Start Identification</Link>
              </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}


function LeafIcon(props) {
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
