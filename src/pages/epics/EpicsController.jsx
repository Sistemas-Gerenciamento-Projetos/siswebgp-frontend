import React, { useState } from 'react';
import EpicsView from './EpicsView';
import { getEpics } from '../../services/epics/getEpics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { showErrorToast } from '../../utils/Toasts';
import { Navigate, useParams } from 'react-router-dom';

export default function EpicsController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [epics, setEpics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function onGetEpics() {
    setLoading(true);
    getEpics(userDetails.accessToken, projectId)
      .then((data) => {
        setEpics(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao buscar os épicos');
        setLoading(false);
      });
  }

  return (
    <EpicsView
      projectDetails={projectDetails}
      epics={epics}
      loading={loading}
      onGetEpics={onGetEpics}
    />
  );
}
