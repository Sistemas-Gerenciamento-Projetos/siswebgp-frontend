import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useUserDetails } from '../../context/usercontext';
import { registerUser } from '../../services/authorization/register-user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/authorization/login';
import { showErrorToast, showSuccessToast } from '../../utils/Toasts';
import { postAddUserInProject } from '../../services/projects/postAddUserInProject';
import { useProjectDetails } from '../../context/projectContext';

function Registration({ cameFromProjectPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!name || name === ' ') {
      newErrors.name = 'Por favor, insira um nome.';
    }

    if (
      !email ||
      email === ' ' ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      newErrors.email = 'Por favor, insira o email corretamente.';
    }

    if (!password || password === ' ') {
      newErrors.password = 'Por favor, insira uma senha.';
    }

    if (password.length < 8) {
      newErrors.password = 'A senha deve conter 8 digitos.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não são iguais.';
    }

    if (confirmPassword === ' ') {
      newErrors.confirmPassword = 'Preencha a confirmação de senha.';
    }

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setErrors({});
    const formErrors = validateForm();
    console.log(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    registerUser(name, email, password)
      .then((data) => {
        if (cameFromProjectPage) {
          console.log(data);
          postAddUserInProject(
            userDetails.accessToken,
            projectDetails.projectId,
            data.user.id,
          )
            .then((data) => {
              showSuccessToast('Novo membro adicionado com sucesso.');
            })
            .catch((error) => {
              showErrorToast('Erro ao adicionar membro no projeto.');
            });
        } else {
          updateUserDetails(data.access, data.refresh, data.user.id);
          login(data.access, email, password)
            .then((data) => {
              localStorage.setItem('userDetails', JSON.stringify(data));
              updateUserDetails(data.access, data.refresh, data.user.id);
            })
            .catch((error) => {
              console.log(error);
              showErrorToast('Erro ao entrar na conta');
            });
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao criar cadastro');
      });
  };

  return (
    <Form className="form-cont" autoComplete="off">
      <Form.Group controlId="name">
        <Form.Control
          type="name"
          placeholder="Nome completo"
          className="form-item mt-4"
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
          className="form-item mt-2"
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
          className="form-item mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password_confirmation">
        <Form.Control
          type="password"
          placeholder="Confirmar senha"
          className="form-item mt-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid mt-3 ">
        <Button type="submit" onClick={submitHandler}>
          Cadastrar
        </Button>
      </div>
    </Form>
  );
}

export default Registration;
