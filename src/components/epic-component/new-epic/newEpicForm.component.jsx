import React, { useRef, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap';

export default function NewEpicForm({ show, setShow }) {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [status] = useState('TODO');
  const formRef = useRef(null);

  const handleClose = () => {
    setShow(!show);
    // Resetar os campos
    setErrors({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo épico</Modal.Title>
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
                Criar épico
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
