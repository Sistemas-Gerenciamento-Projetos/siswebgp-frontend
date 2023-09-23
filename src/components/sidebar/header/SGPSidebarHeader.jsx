import styled from 'styled-components';
import React from 'react';
import Typography from 'react-pro-sidebar';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

const StyledLogo = styled.div`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #009fdb;
  background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
  margin-right: 10px;
  margin-left: 4px;
`;

const StyledSubtitle = styled.p`
  font-size: 18px;
  line-height: 28px;
  font-weight: 700;
  color: #0098e5;
`;

export default function SGPSidebarHeader() {
  return (
    <StyledSidebarHeader>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <StyledLogo>P</StyledLogo>
        <StyledSubtitle variant="subtitle1" fontWeight={700} color="#0098e5">
          SGP
        </StyledSubtitle>
      </div>
    </StyledSidebarHeader>
  );
}
