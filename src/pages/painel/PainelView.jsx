import React from 'react';
import { ToastContainer } from 'react-toastify';
import Toolbar from '../../components/toolbar/toolbar.component';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import { Root, ContentDiv } from './PainelStyles';
import BoardController from '../../components/board/BoardController';

const PainelView = ({ projectName }) => {
  return (
    <Root>
      <SGPSidebar />
      <ContentDiv>
        <Toolbar
          menuItem={3}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={`${projectName} / Painel`}
        />
        <BoardController />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </ContentDiv>
    </Root>
  );
};

export default PainelView;
