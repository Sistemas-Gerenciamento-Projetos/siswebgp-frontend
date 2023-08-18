import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserDetails } from '../../context/usercontext';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../../services/authorization/register-user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/authorization/login';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userDetails, updateUserDetails] = useUserDetails();

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!name || name === ' ') {
      newErrors.name = 'Por favor, insira seu nome.';
    }

    if (
      !email ||
      email === ' ' ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      newErrors.email = 'Por favor, insira seu email corretamente.';
    }

    if (!password || password === ' ') {
      newErrors.password = 'Por favor, insira sua senha.';
    }

    if (password.length < 8) {
      newErrors.password = 'A senha deve conter 8 digitos.';
    }

    if (password !== confirmPassword || confirmPassword === ' ') {
      newErrors.confirmPassword = 'Confirme sua senha.';
    }

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    console.log(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    registerUser(name, email, password)
      .then((data) => {
        updateUserDetails(data.access, data.refresh, data.user.id);
        login(data.access, email, password)
          .then((data) => {
            localStorage.setItem('userDetails', JSON.stringify(data));
            updateUserDetails(data.access, data.refresh, data.user.id);
            <Navigate replace to="/" />;
          })
          .catch((error) => {
            console.log(error);
            toast.error('Erro ao entrar na conta', {
              position: 'bottom-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao criar cadastro', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  return (
    <Form className="form-cont" autoComplete="off">
      <Form.Group controlId="name">
        <Form.Control
          type="name"
          placeholder="Nome completo"
          className="form-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          className="form-item"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Senha"
          className="form-item"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Confirmar senha"
          className="form-item"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirm_password}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid mt-3 ">
        <Button type="submit" onClick={submitHandler}>
          Cadastrar
        </Button>
      </div>
    </Form>
  );
};

export default Registration;
