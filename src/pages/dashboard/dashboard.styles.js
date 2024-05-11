import { styled } from 'styled-components';

export const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentDiv = styled.div`
  width: 75%;
  justify-content: center;
  max-width: 1090px;
`;

export const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 80px);
  align-items: center;
`;
