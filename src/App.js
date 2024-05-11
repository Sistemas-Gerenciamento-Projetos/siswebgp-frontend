import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthenticationController from './pages/authentication/AuthenticationController';
import { UserDetailsProvider } from './context/usercontext';
import Home from './pages/home/home.component';
import { Navigate } from 'react-router-dom';
import { ProjectDetailsProvider } from './context/projectContext';
import ProjetosController from './pages/projetos/ProjetosController';
import Painel from './pages/painel/painel.component';
import Roteiro from './pages/roteiro/roteiro.component';
import Epics from './pages/epics/EpicsView';
import BacklogController from './pages/backlog/BacklogController';
import DashboardController from './pages/dashboard/DashboardController';
import EpicsController from './pages/epics/EpicsController';

const App = () => {
  return (
    <UserDetailsProvider>
      <ProjectDetailsProvider>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
          <Route path="auth/" element={<AuthenticationController />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="projects" element={<ProjetosController />} />
          <Route
            path="projects/:projectId/dashboard"
            element={<DashboardController />}
          />
          <Route
            path="projects/:projectId/backlog"
            element={<BacklogController />}
          />
          <Route
            path="projects/:projectId/backlog/:taskId/edit"
            element={<BacklogController />}
          />
          <Route path="projects/:projectId/painel" element={<Painel />} />
          <Route path="projects/:projectId/roteiro" element={<Roteiro />} />
          <Route
            path="projects/:projectId/epics"
            element={<EpicsController />}
          />
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
