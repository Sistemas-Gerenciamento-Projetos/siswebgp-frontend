import styled from 'styled-components';

export const Root = styled.div`
  background-color: #ebebeb;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px 0;
`;

export const ManagerInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ManagerInfoTitle = styled.span`
  margin-right: 10px;
  font-size: 16px;
`;

export const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const Title = styled.h3`
  font-size: 20px;
`;

export const ExitButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
