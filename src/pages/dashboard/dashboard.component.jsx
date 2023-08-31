import React from 'react';
import DashboardCardItem from '../../components/dashboard-components/card-item/dashboardCardItem.component';
import { styled } from 'styled-components';
import DashboardPieItem from '../../components/dashboard-components/pie-item/dashboardPieItem.component';

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px;
`;

export default function Dashboard() {
  return (
    <>
      <CardsDiv>
        <DashboardCardItem data={1000} title={'Cards criados'} />
        <DashboardCardItem data={1000} title={'Épicos concluídos'} />
        <DashboardCardItem data={1000} title={'Tarefas concluídas'} />
        <DashboardCardItem data={1000} title={'Projeto concluído'} />
        <DashboardCardItem data={1000} title={'Dias restantes'} />
      </CardsDiv>
      <DashboardPieItem />
    </>
  );
}
