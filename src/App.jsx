import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/common.css';

// Loading the components lazily
const Layout = lazy(() => import('./components/Layout'));
const ProfileSetup = lazy(() => import('./components/ProfileSetup'));
const ViewProfile = lazy(() => import('./components/ViewProfile'));
const Insights = lazy(() => import('./components/Insights'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Please wait....</div>}>  
      {/* use shimmer UI componet for better UI fallback! */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProfileSetup />} />
            <Route path="setup" element={<ProfileSetup />} />
            <Route path="view" element={<ViewProfile />} />
            <Route path="insights" element={<Insights />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
