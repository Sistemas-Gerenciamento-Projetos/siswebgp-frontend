import React from 'react';
import PainelView from './PainelView';
import { useProjectDetails } from '../../context/projectContext';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';

export default function PainelController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return <PainelView projectName={projectDetails.projectName} />;
}
