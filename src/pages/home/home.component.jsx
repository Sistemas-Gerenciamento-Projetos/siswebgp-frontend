import React from 'react';
import AuthenticationController from '../authentication/AuthenticationController';
import './home.styles.scss';

const Home = () => {
  return (
    <div className="home">
      <AuthenticationController />
    </div>
  );
};

export default Home;
