import React, { useState } from 'react';
import {
  Form,
  Button,
  InputGroup,
  Badge,
  Modal,
  Row,
  Col,
} from 'react-bootstrap';
import './new-project.scss';
import { postProject } from '../../services/projects/postProject';
import { showErrorToast, showSuccessToast } from '../../utils/Toasts';
import { Spin } from 'antd';

const NewProject = ({ onRefreshProjects, userDetails, show, setShow }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setLoading(false);
      setErrors(formErrors);
      return;
    }

    const form = event.currentTarget;
    if (form.checkValidity() === false && title.trim() && description.trim()) {
      setLoading(false);
      setValidated(true);
      return;
    }

    postProject(
      userDetails.accessToken,
      userDetails.id,
      title,
      description,
      beginDate,
      endDate,
    )
      .then((data) => {
        onRefreshProjects();
        showSuccessToast('Projeto criado');
        setLoading(false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao criar projeto');
        setLoading(false);
      });
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setBeginDate('');
    setEndDate('');
    setValidated(false);
    setErrors({});
    setShow(!show);
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
      newErrors.beginDate = 'Data de início inválida.';
    }

    if (!endDate || endDate === '') {
      newErrors.endDate = 'Data de fim inválida.';
    }

    return newErrors;
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="main-form-new-project"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* Tem um bug visual na validação de string com espaços em branco, o form nega o seguimento mas o feedback visual é de correto */}
            <Form.Group controlId="title">
              <Form.Label className="label">Título:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  className="form-item"
                  required
                  isInvalid={!!errors.title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label className="label">Descrição:</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={200}
                rows={3}
                type="text"
                className="form-item"
                value={description}
                isInvalid={!!errors.description}
                required
                onChange={(e) => setDescription(e.target.value)}
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

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="label">Data de início:</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    className="form-item"
                    value={beginDate}
                    isInvalid={!!errors.beginDate}
                    onChange={(e) => setBeginDate(e.target.value)}
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
                      isInvalid={!!errors.endDate}
                      min={
                        beginDate === ''
                          ? new Date().toISOString().split('T')[0]
                          : beginDate
                      }
                      disabled={beginDate === ''}
                      required
                      className="form-item"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.endDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '16px',
                }}
              >
                <Spin />
              </div>
            ) : (
              <div className="d-grid mt-4">
                <Button type="submit">Cadastrar</Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewProject;
