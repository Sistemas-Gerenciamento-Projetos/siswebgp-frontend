import React from 'react';
import FormLogin from '../../components/form-login/login';
import CompUfba from '../../Assets/comp-ufba.png';
import LogoSGP from '../../Assets/logo.png';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormRegister from '../../components/form-register/form-register.component';
import './authentication.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthenticationView = ({ isRegistered, handleRegister }) => {
  return (
    <Container className="main-auth">
      <Row className="justify-content-md-center">
        <Col className="col-left" sm={6} xl={5}>
          <img className="logo" src={LogoSGP} alt="Computação Ufba" />{' '}
          <img className="logo-ufba" src={CompUfba} alt="Computação Ufba" />{' '}
        </Col>
        <Col className="col-right " sm={6} xl={5}>
          {isRegistered && (
            <>
              <h2>{'Login'}</h2>
              <FormLogin />
              <div className="d-grid mt-3 ">
                <p>
                  Ainda não possui cadastro?{' '}
                  <Link onClick={handleRegister}>Registre-se</Link>
                </p>
              </div>
            </>
          )}
          {!isRegistered && (
            <>
              <h2>{'Registre-se'}</h2>
              <FormRegister
                handleRegister={handleRegister}
                cameFromProjectPage={false}
              />
              <p className="mt-3">
                Já possui cadastro? <Link onClick={handleRegister}>Login</Link>
              </p>
            </>
          )}
        </Col>
      </Row>
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
    </Container>
  );
};

export default AuthenticationView;
