import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  height: 100vh;
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MenuItemContent = styled.div`
  flex: 1;
  margin-bottom: 32px;
`;

export const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
};
