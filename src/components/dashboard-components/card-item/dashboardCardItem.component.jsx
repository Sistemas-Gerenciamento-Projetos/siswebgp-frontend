import React from 'react';
import { styled } from 'styled-components';

const RootDiv = styled.div`
  width: 200px;
  height: 200px;
  background-color: #bae7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const DataText = styled.span`
  font-size: 32px;
`;

const TitleText = styled.span`
  font-size: 16px;
`;

export default function DashboardCardItem({ data, title }) {
  return (
    <RootDiv>
      <DataText>{data}</DataText>
      <TitleText>{title}</TitleText>
    </RootDiv>
  );
}
