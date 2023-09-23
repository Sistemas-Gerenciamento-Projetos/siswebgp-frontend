import React from 'react';
import SGPLogo from '../../../Assets/logo.png';
import { StyledSidebarHeader } from './sgpSidebarHeader.styles';

export default function SGPSidebarHeader({ collapsed }) {
  return (
    <StyledSidebarHeader>
      <img
        src={SGPLogo}
        alt="logo SGP"
        width={'100%'}
        height={'100%'}
        style={{ objectFit: 'contain' }}
      />
    </StyledSidebarHeader>
  );
}
