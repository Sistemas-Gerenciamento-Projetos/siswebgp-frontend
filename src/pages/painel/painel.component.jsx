import React from 'react';
import Board from '../../components/board/board.component';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { ToastContainer } from 'react-toastify';

const Painel = () => {
  const [userDetails] = useUserDetails();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
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
    </>
  );
};

export default Painel;
