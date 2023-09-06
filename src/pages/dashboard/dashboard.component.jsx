import React, { useEffect, useState } from 'react';
import DashboardCardItem from '../../components/dashboard-components/card-item/dashboardCardItem.component';
import { styled } from 'styled-components';
import DashboardPieItem from '../../components/dashboard-components/pie-item/dashboardPieItem.component';
import { getAnalytics } from '../../services/analytics/getAnalytics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px;
`;

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
    <>
      <CardsDiv>
        {cards.map((card, index) => (
          <DashboardCardItem key={index} card={card} />
        ))}
      </CardsDiv>
      <DashboardPieItem piesData={pies} />
    </>
  );
}
