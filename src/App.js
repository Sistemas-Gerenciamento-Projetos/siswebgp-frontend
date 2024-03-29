import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './pages/authentication/authentication';
import { UserDetailsProvider } from './context/usercontext';
import Home from './pages/home/home.component';
import { Navigate } from 'react-router-dom';
import { ProjectDetailsProvider } from './context/projectContext';
import Projetos from './pages/projetos/projetos.component';
import Dashboard from './pages/dashboard/dashboard.component';
import Backlog from './pages/backlog/backlog.component';
import Painel from './pages/painel/painel.component';
import Roteiro from './pages/roteiro/roteiro.component';
import Epics from './pages/epics/epics.component';

const App = () => {
  return (
    <UserDetailsProvider>
      <ProjectDetailsProvider>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="auth/" element={<Authentication />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="projects" element={<Projetos />} />
          <Route path="projects/:projectId/dashboard" element={<Dashboard />} />
          <Route path="projects/:projectId/backlog" element={<Backlog />} />
          <Route
            path="projects/:projectId/backlog/:taskId/edit"
            element={<Backlog />}
          />
          <Route path="projects/:projectId/painel" element={<Painel />} />
          <Route path="projects/:projectId/roteiro" element={<Roteiro />} />
          <Route path="projects/:projectId/epics" element={<Epics />} />
          <Route
            path="projects/:projectId/epics/:epicId/edit"
            element={<Epics />}
          />
        </Routes>
      </ProjectDetailsProvider>
    </UserDetailsProvider>
  );
};

export default App;
