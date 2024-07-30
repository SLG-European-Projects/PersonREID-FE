import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateGalleryPage } from './pages/CreateGalleryPage';
import { SuccessPage } from './pages/SuccessPage';
import { GalleryPage } from './pages/GalleryPage';
import { ListPage } from './pages/ListPage';
import Layout from './Layout';
import ClusterDetailPage from './pages/ClusterDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-gallery" element={<CreateGalleryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/gallery/:jobId" element={<GalleryPage />} />
          <Route path="/cluster/:jobId/:clusterId" element={<ClusterDetailPage />} />
          <Route path="/gallery" element={<ListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
