import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/authentication';
import { UserDetailsProvider } from './context/usercontext';
import Home from './pages/home/home.component';
import { Navigate } from 'react-router-dom';
import { ProjectDetailsProvider } from './context/projectContext';

const App = () => {
  return (
    <UserDetailsProvider>
      <ProjectDetailsProvider>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="auth/" element={<Authentication />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ProjectDetailsProvider>
    </UserDetailsProvider>
  );
};

export default App;
