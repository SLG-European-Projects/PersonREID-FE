import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateGalleryPage } from './pages/CreateGalleryPage';
import { SuccessPage } from './pages/SuccessPage';
import { GalleryPage } from './pages/GalleryPage';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-gallery" element={<CreateGalleryPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
