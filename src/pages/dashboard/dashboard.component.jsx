import React, { useEffect, useState } from 'react';
import DashboardCardItem from '../../components/dashboard-components/card-item/dashboardCardItem.component';
import DashboardPieItem from '../../components/dashboard-components/pie-item/dashboardPieItem.component';
import { getAnalytics } from '../../services/analytics/getAnalytics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { CardsDiv, ContentDiv, Root } from './dashboard.styles';
import { showErrorToast } from '../../utils/Toasts';
import { Spin } from 'antd';
import Toolbar from '../../components/toolbar/toolbar.component';
import SGPSidebar from '../../components/sidebar/sidebar.component';

export default function Dashboard() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [cards, setCards] = useState([]);
  const [pies, setPies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={1}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={`${projectDetails.projectName} / Dashboard`}
        />
        <Root>
          {loading ? (
            <Spin />
          ) : (
            <ContentDiv>
              <CardsDiv>
                {cards.map((card, index) => (
                  <DashboardCardItem key={index} card={card} />
                ))}
              </CardsDiv>
              <DashboardPieItem piesData={pies} />
            </ContentDiv>
          )}
        </Root>
      </div>
    </div>
  );
}
