import { PieChart } from 'devextreme-react';
import { Connector, Label, Series, Size } from 'devextreme-react/pie-chart';
import React from 'react';
import { styled } from 'styled-components';

const RootDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px;
`;

const PieDiv = styled.div`
  background-color: #bae7ff;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export default function DashboardPieItem({ piesData }) {
  const inProgressAndCompletedPie = [piesData[0], piesData[1]];
  const cardsByStatePie = [piesData[2], piesData[3], piesData[4], piesData[5]];

  const pieCharts = [
    {
      title: 'Cards em andamento/concluídos',
      dataSource: inProgressAndCompletedPie,
    },
    { title: 'Cards por status', dataSource: cardsByStatePie },
  ];

  return (
    <RootDiv>
      {pieCharts.map((options, i) => {
        return (
          <PieDiv key={i}>
            <PieChart
              title={options.title}
              dataSource={options.dataSource}
              type="doughnut"
            >
              <Series argumentField="title" valueField="data">
                <Label visible={true}>
                  <Connector visible={true} width={1} />
                </Label>
              </Series>

              <Size width={500} />
            </PieChart>
          </PieDiv>
        );
      })}
    </RootDiv>
  );
}
