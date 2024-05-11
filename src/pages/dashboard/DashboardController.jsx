import React, { useState } from 'react';
import DashboardView from './DashboardView';
import { getAnalytics } from '../../services/analytics/getAnalytics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';

export default function DashboardController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [cards, setCards] = useState([]);
  const [pies, setPies] = useState([]);
  const [loading, setLoading] = useState(false);

  function onGetAnalytics() {
    setLoading(true);
    getAnalytics(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        const cardsJson = [];
        const piesJson = [];
        for (let i = 0; i < 4; i++) {
          cardsJson.push(data[i]);
        }

        for (let i = 4; i < data.length; i++) {
          piesJson.push(data[i]);
        }

        setCards(cardsJson);
        setPies(piesJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        showErrorToast('Erro ao carregar o dashboard');
      });
  }

  return (
    <DashboardView
      projectDetails={projectDetails}
      cards={cards}
      pies={pies}
      loading={loading}
      onGetAnalytics={onGetAnalytics}
    />
  );
}
