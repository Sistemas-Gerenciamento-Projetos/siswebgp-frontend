import React, { useEffect, useState } from 'react';
import DashboardCardItem from '../../components/dashboard-components/card-item/dashboardCardItem.component';
import DashboardPieItem from '../../components/dashboard-components/pie-item/dashboardPieItem.component';
import { getAnalytics } from '../../services/analytics/getAnalytics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { CardsDiv, ContentDiv, Root } from './dashboard.styles';

export default function Dashboard() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [cards, setCards] = useState([]);
  const [pies, setPies] = useState([]);

  useEffect(() => {
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
        console.log(cardsJson);
        console.log(piesJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Root>
      <ContentDiv>
        <CardsDiv>
          {cards.map((card, index) => (
            <DashboardCardItem key={index} card={card} />
          ))}
        </CardsDiv>
        <DashboardPieItem piesData={pies} />
      </ContentDiv>
    </Root>
  );
}
