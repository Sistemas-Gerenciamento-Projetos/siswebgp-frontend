import React from 'react';
import Board from '../../components/board/board.component';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { ToastContainer } from 'react-toastify';
import Toolbar from '../../components/toolbar/toolbar.component';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import { useProjectDetails } from '../../context/projectContext';

const Painel = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={3}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={`${projectDetails.projectName} / Painel`}
        />
        <Board />
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
      </div>
    </div>
  );
};

export default Painel;
