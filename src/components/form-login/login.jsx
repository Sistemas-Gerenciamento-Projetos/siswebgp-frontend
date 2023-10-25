import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserDetails } from '../../context/usercontext';
import { login } from '../../services/authorization/login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [userDetails, updateUserDetails] = useUserDetails();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (
      !email ||
      email === ' ' ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      newErrors.email = 'Verifique seu email.';
    }

    if (!password || password === ' ' || password.length < 8) {
      newErrors.password = 'Verifique seus dados.';
    }

    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    login(userDetails.accessToken, email, password)
      .then((data) => {
        setErrors('');
        localStorage.setItem('userDetails', JSON.stringify(data));
        updateUserDetails(data.access, data.refresh, data.user.id);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Credenciais inválidas', {
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
    <Form className="form-cont" autoComplete="off" onSubmit={submitHandler}>
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-item"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="senha" controlId="password">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="form-item"
          isInvalid={!!errors.password}
        />

        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" onClick={submitHandler} variant="primary">
          Entrar
        </Button>
      </div>
    </Form>
  );
}

export default Login;
