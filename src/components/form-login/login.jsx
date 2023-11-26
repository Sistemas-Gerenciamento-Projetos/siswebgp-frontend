import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserDetails } from '../../context/usercontext';
import { login } from '../../services/authorization/login';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../utils/Toasts';

function Login() {
  const [userDetails, updateUserDetails] = useUserDetails();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setLoading(false);
      setErrors(formErrors);
      return;
    }

    login(userDetails.accessToken, email, password)
      .then((data) => {
        setLoading(false);
        setErrors('');
        localStorage.clear();
        localStorage.setItem('userDetails', JSON.stringify(data));
        updateUserDetails(data.access, data.refresh, data.user.id);
        navigate('/projects');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        showErrorToast('Credenciais inválidas');
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
        {loading ? (
          <Spin />
        ) : (
          <Button type="submit" onClick={submitHandler} variant="primary">
            Entrar
          </Button>
        )}
      </div>
    </Form>
  );
}

export default Login;
