import React, { useState, useRef, useEffect } from 'react';
import { Button, InputGroup, Badge } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { patchTask } from '../../../services/tasks/patchTask';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { postTask } from '../../../services/tasks/postTask';
import { getUsersByProject } from '../../../services/users/getUsersByProject';
import { toast } from 'react-toastify';

function NewTaskBacklog({
  show,
  setShow,
  titleAction,
  textButton,
  task,
  onRefreshTasks,
}) {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [listUsers, setListUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [idUser, setIdUser] = useState('');
  const [errors, setErrors] = useState({});
  const [setUpdate] = useState();

  const formRef = useRef(null);
  const [status] = useState('TODO');

  const handleReset = () => {
    setTitle('');
    setBeginDate('');
    setDeadlineDate('');
    setDescription('');
    setIdUser(userDetails.id);
  };

  const handleClose = () => {
    setShow(!show);
    handleReset();
    setErrors({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    setUserName(listUsers.find((x) => x.id == idUser).name); // atualiza o nome do usuário

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (titleAction === 'Editar tarefa') {
      editTask();
    } else {
      createTask();
    }

    setShow(!show);
    handleReset();
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
    const newEditedTask = { ...task };
    newEditedTask.title = title;
    newEditedTask.description = description;
    newEditedTask.start_date = beginDate;
    newEditedTask.deadline_date = deadlineDate;
    newEditedTask.user = idUser;
    newEditedTask.user_name = userName;

    patchTask(
      userDetails.accessToken,
      projectDetails.projectId,
      newEditedTask,
      setUpdate,
    )
      .then((data) => {
        onRefreshTasks();
        setShow(!show);
        toast.success('Tarefa atualizada', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao atualizar tarefa', {
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

  const createTask = () => {
    postTask(
      userDetails.accessToken,
      projectDetails.projectId,
      title,
      description,
      beginDate,
      deadlineDate,
      status,
      idUser,
    )
      .then((data) => {
        onRefreshTasks();
        toast.success('Tarefa criada', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao criar tarefa', {
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

  useEffect(() => {
    getUsersByProject(userDetails, projectDetails, setListUsers);
    if (titleAction === 'Editar tarefa') {
      setTitle(task.title);
      setBeginDate(task.start_date.substring(0, 10));
      setDeadlineDate(task.deadline_date.substring(0, 10));
      setDescription(task.description);
      setUserName(task.user_name);
      setIdUser(task.user);
    } else {
      handleReset();
    }
    setErrors({});
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleAction}</Modal.Title>
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
                defaultValue={idUser}
                onChange={(e) => setIdUser(e.target.value)}
              >
                {listUsers.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
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

            <div className="d-grid mt-4">
              <Button variant="primary" type="submit">
                {textButton}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewTaskBacklog;
