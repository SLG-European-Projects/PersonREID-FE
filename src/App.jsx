import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateGalleryPage } from './pages/CreateGalleryPage';
import { SuccessPage } from './pages/SuccessPage';
import { GalleryPage } from './pages/GalleryPage';
import { ListPage } from './pages/ListPage';
import Layout from './Layout';
import ClusterDetailPage from './pages/ClusterDetailPage';
import { SearchSuspectPage } from './pages/SearchSuspect';
import {SuspectDetailPage} from './pages/SuspectDetailPage';
import { SuspectListPage } from './pages/SuspectListPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-gallery" element={<CreateGalleryPage />} />
          <Route path="/search-suspect/" element={<SearchSuspectPage />} />
          <Route path="/reid/:jobId/" element={<SuspectListPage />} /> 
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/gallery/:jobId" element={<GalleryPage />} />
          <Route path="/cluster/:jobId/:clusterId" element={<ClusterDetailPage />} />
          <Route path="/reid/:jobId/:suspectId" element={<SuspectDetailPage />} />
          <Route path="/gallery" element={<ListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
