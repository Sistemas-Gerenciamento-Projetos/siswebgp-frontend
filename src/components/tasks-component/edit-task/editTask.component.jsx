import React, { useState, useRef, useEffect } from 'react';
import { Button, InputGroup, Badge } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { patchTask } from '../../../services/tasks/patchTask';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { getUsersByProject } from '../../../services/users/getUsersByProject';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import { Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask } from '../../../services/tasks/getTask';

export default function EditTask({ show, setShow, onRefreshTasks }) {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [listUsers, setListUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [idUser, setIdUser] = useState('');
  const [status, setStatus] = useState('');
  const [epic, setEpic] = useState('');
  const [id, setId] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const handleReset = () => {
    setTitle('');
    setBeginDate('');
    setDeadlineDate('');
    setDescription('');
    setIdUser('');
  };

  const handleClose = () => {
    navigate(-1);
    setShow(!show);
    handleReset();
    setErrors({});
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const formErrors = validateForm();

    setUserName(listUsers.find((x) => x.id == idUser).name); // atualiza o nome do usuário

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    editTask();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title || !title.trim()) {
      newErrors.title = 'Preencha o título.';
    }

    if (!description || description === '' || !description.trim()) {
      newErrors.description = 'Preencha descrição.';
    }

    if (!beginDate || beginDate === '') {
      newErrors.beginDate = 'Data de início.';
    }

    if (!deadlineDate || deadlineDate === '') {
      newErrors.deadlineDate = 'Data de fim.';
    }

    return newErrors;
  };

  const editTask = async () => {
    const newEditedTask = {
      id: id,
      title: title,
      description: description,
      start_date: beginDate,
      deadline_date: deadlineDate,
      user: idUser,
      user_name: userName,
      status: status,
      epic: epic,
    };

    console.log(newEditedTask);

    patchTask(
      userDetails.accessToken,
      projectDetails.projectId,
      projectDetails.projectName,
      projectDetails.managerEmail,
      newEditedTask,
    )
      .then((data) => {
        onRefreshTasks();
        setShow(!show);
        showSuccessToast('Tarefa atualizada');
        setLoading(false);
        setShow(!show);
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao atualizar tarefa');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (show) {
      getTask(userDetails.accessToken, projectId, taskId)
        .then((data) => {
          if (data != null) {
            setTitle(data.title);
            setBeginDate(data.start_date.substring(0, 10));
            setDeadlineDate(data.deadline_date.substring(0, 10));
            setDescription(data.description);
            setIdUser(data.user);
            setUserName(data.user_name);
            setStatus(data.status);
            setEpic(data.epic);
            setId(data.id);
          }
        })
        .catch((error) => {
          console.log(error);

          showErrorToast('Erro ao carregar os dados da tarefa');
        });

      getUsersByProject(userDetails.accessToken, projectId)
        .then((data) => {
          setListUsers(data);
        })
        .catch((error) => {
          console.log(error);

          showErrorToast('Erro ao recuperar os usuários do projeto');
        });

      setErrors({});
    }
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Editar Tarefa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="label">Título:</Form.Label>

              <Form.Control
                type="text"
                placeholder="Digite o título da tarefa"
                isInvalid={!!errors.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="users">
              <Form.Label className="label">Responsável:</Form.Label>
              <Form.Select
                value={idUser}
                onChange={(e) => setIdUser(e.target.value)}
              >
                {listUsers.map((user) => {
                  return (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="starDate">
                  <Form.Label className="label">Data de início:</Form.Label>
                  <Form.Control
                    type="date"
                    isInvalid={!!errors.beginDate}
                    value={beginDate}
                    onChange={(e) => [setBeginDate(e.target.value)]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.beginDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="endDate">
                  <Form.Label className="label">Data de fim:</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      isInvalid={!!errors.deadlineDate}
                      min={
                        beginDate === ''
                          ? new Date().toISOString().split('T')[0]
                          : beginDate
                      }
                      disabled={beginDate === ''}
                      value={deadlineDate}
                      onChange={(e) => [setDeadlineDate(e.target.value)]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.deadlineDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="description"
              style={{ marginTop: '1rem' }}
            >
              <Form.Label className="label">Descrição:</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={200}
                type="text"
                rows={3}
                value={description}
                isInvalid={!!errors.description}
                onChange={(e) => [setDescription(e.target.value)]}
              />
              <Badge
                className="form-item"
                text="primary"
                bg={`${description.length > 200 ? 'danger' : 'light'}`}
              >
                {description.length}/{200}
              </Badge>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </div>
            ) : (
              <div className="d-grid mt-4">
                <Button variant="primary" type="submit">
                  Salvar Alterações
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
