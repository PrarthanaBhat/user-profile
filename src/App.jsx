import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProfileSetup from './components/ProfileSetup';
import ViewProfile from './components/ViewProfile'; 
import Insights from './components/Insights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfileSetup />} />
          <Route path="setup" element={<ProfileSetup />} />
          <Route path="view" element={<ViewProfile />} />
          <Route path="insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
