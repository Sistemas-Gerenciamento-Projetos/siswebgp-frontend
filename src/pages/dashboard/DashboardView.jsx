import React from 'react';
import DashboardCardItem from '../../components/dashboard-components/card-item/dashboardCardItem.component';
import DashboardPieItem from '../../components/dashboard-components/pie-item/dashboardPieItem.component';
import { CardsDiv, ContentDiv, LoadingDiv, Root } from './dashboard.styles';
import { Spin } from 'antd';
import Toolbar from '../../components/toolbar/toolbar.component';
import SGPSidebar from '../../components/sidebar/sidebar.component';

export default function DashboardView({
  projectDetails,
  cards,
  pies,
  loading,
}) {
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
            <LoadingDiv>
              <Spin />
            </LoadingDiv>
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
