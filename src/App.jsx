import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateGalleryWrapper } from './pages/CreateGalleryWrapper';
import { SuccessPage } from './pages/SuccessPage';
import { GalleryPage } from './pages/GalleryPage';
import { ListPage } from './pages/ListPage';
import Layout from './Layout';
import ClusterDetailPage from './pages/ClusterDetailPage';
import { SearchSuspectWrapper } from './pages/SearchSuspectWrapper';
import {SuspectDetailPage} from './pages/SuspectDetailPage';
import { FileBrowser } from './pages/FileBrowser';
import { SuspectListResult } from './pages/SuspectListResult';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-gallery" element={<CreateGalleryWrapper />} />
          <Route path="/search-suspect/" element={<SearchSuspectWrapper />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/gallery/:jobId" element={<GalleryPage />} />
          <Route path="/cluster/:jobId/:clusterId" element={<ClusterDetailPage />} />
          <Route path="/reid/:jobId/:suspectId" element={<SuspectDetailPage />} />
          <Route path="/gallery" element={<ListPage />} />
          <Route path="/select" element={<FileBrowser />} />
          <Route path="/reid/:jobId/" element={<SuspectListResult />} />

          {/* Route with dynamic folderPath */}
        <Route path="/select/:folderPath/*" element={<FileBrowser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
