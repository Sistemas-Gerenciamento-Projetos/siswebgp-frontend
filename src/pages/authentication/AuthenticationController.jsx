import React, { useState } from 'react';
import AuthenticationView from './AuthenticationView';

function AuthenticationController() {
  const [isRegistered, setIsRegistered] = useState(true);

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <AuthenticationView
      isRegistered={isRegistered}
      handleRegister={handleRegister}
    />
  );
}

export default AuthenticationController;
