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

export default function DashboardPieItem() {
  const mock1 = [
    {
      status: 'concluídos',
      percent: 49,
    },
    {
      status: 'em andamento',
      percent: 51,
    },
  ];

  const mock2 = [
    {
      status: 'Concluído',
      percent: 25,
    },
    {
      status: 'Em progresso',
      percent: 25,
    },
    {
      status: 'Pausado',
      percent: 25,
    },
    {
      status: 'A fazer',
      percent: 25,
    },
  ];

  const pieCharts = [
    { title: 'Cards em andamento/concluídos', dataSource: mock1 },
    { title: 'Cards por status', dataSource: mock2 },
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
              <Series argumentField="status" valueField="percent">
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
