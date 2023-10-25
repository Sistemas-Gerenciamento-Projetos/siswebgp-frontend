import React from 'react';
import Authentication from '../authentication/authentication';
import './home.styles.scss';

const Home = () => {
  return (
    <div className="home">
      <Authentication />
    </div>
  );
};

export default Home;
