import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { getUsersByProject } from '../../../services/users/getUsersByProject';
import { patchEpic } from '../../../services/epics/patchEpic';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import { Spin } from 'antd';

export default function EditEpicForm({
  epic,
  show,
  setShow,
  update,
  setUpdate,
}) {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState(epic.title);
  const [description, setDescription] = useState(epic.description);
  const [beginDate, setBeginDate] = useState(epic.start_date.substring(0, 10));
  const [deadlineDate, setDeadlineDate] = useState(
    epic.deadline_date.substring(0, 10),
  );
  const [idUser, setIdUser] = useState(userDetails.id);
  const [listUsers, setListUsers] = useState([]);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(!show);
    setErrors({});
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    epic.title = title;
    epic.description = description;
    epic.user = idUser;
    epic.start_date = beginDate;
    epic.deadline_date = deadlineDate;

    patchEpic(userDetails.accessToken, projectDetails.projectId, epic)
      .then((data) => {
        setUpdate(!update);
        handleClose();
        showSuccessToast('Épico atualizado');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao atualizar épico');
        setLoading(false);
      });
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

  useEffect(() => {
    getUsersByProject(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setListUsers(data);
      })
      .catch((error) => {
        console.log(error);

        showErrorToast('Erro ao recuperar os usuários do projeto');
      });
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar épico</Modal.Title>
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

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Spin />
              </div>
            ) : (
              <div className="d-grid mt-4">
                <Button variant="primary" type="submit">
                  Atualizar épico
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
