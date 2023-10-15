import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './add-new-user.styles.scss';
import { useUserDetails } from '../../../context/usercontext';
import { getUsers } from '../../../services/users/getUsers';
import { postAddUserInProject } from '../../../services/projects/postAddUserInProject';
import { useProjectDetails } from '../../../context/projectContext';
import { Spin } from 'antd';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';

const AddNewUser = ({ handleClose }) => {
  const [users, setUsers] = useState([]);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  let selectedUserId = '';
  const [loading, setLoading] = useState(true);

  function fetchUsersList() {
    getUsers(userDetails.accessToken, projectDetails.projectId)
      .then((response) => {
        setLoading(false);
        setUsers(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        showErrorToast('Erro ao recuperar os usuários do projeto');
      });
  }

  useEffect(() => {
    fetchUsersList();
  }, []);

  function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();

    if (selectedUserId !== '') {
      postAddUserInProject(
        userDetails.accessToken,
        projectDetails.projectId,
        selectedUserId,
      )
        .then(() => {
          setLoading(false);
          showSuccessToast('Membro adicionado');
          fetchUsersList();
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          showErrorToast('Erro ao adicionar membro');
        });
    } else {
      showErrorToast('Selecione um membro');
    }
  }

  return (
    <Form className="main-add" noValidate onSubmit={handleSubmit}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            height: '180px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Form.Label>Pesquisar usuário:</Form.Label>

          <Form.Control
            className="mt-4"
            as="select"
            onChange={(e) => (selectedUserId = e.target.value)}
          >
            <option key={0} value={''}>
              Selecione um usuário...
            </option>
            {users.map((user, index) => (
              <option key={index + 1} value={user.id}>
                {user.name} | {user.email}
              </option>
            ))}
          </Form.Control>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              style={{ width: '45%' }}
              className="btn-submit mt-4"
              variant="secondary"
              onClick={handleClose}
            >
              Voltar
            </Button>

            <Button
              style={{ width: '45%' }}
              className="btn-submit mt-4"
              type="submit"
              variant="primary"
            >
              Adicionar
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default AddNewUser;
