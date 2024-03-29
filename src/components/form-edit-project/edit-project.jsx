import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Badge, Modal } from 'react-bootstrap';
import './edit-project.scss';
import { patchProject } from '../../services/projects/patchProject';
import { useUserDetails } from '../../context/usercontext';
import { toast } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../../utils/Toasts';
import { Spin } from 'antd';

const EditProject = ({
  project,
  novoProjeto,
  setNovoProjeto,
  show,
  setShow,
}) => {
  const [userDetails] = useUserDetails();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(project);
    if (project != undefined) {
      setTitle(project.project_name);
      setDescription(project.description);
      setBeginDate(project.start_date.split('T')[0]);
      setEndDate(project.deadline_date.split('T')[0]);
    }
  }, []);

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setLoading(false);
      setValidated(true);
      return;
    }

    patchProject(
      userDetails.accessToken,
      userDetails.id,
      project.id,
      title,
      description,
      beginDate,
      endDate,
    )
      .then((data) => {
        setLoading(false);
        setNovoProjeto(!novoProjeto);
        handleClose();
        showSuccessToast('Projeto atualizado');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        showErrorToast('Erro ao atualizar projeto');
      });
  };

  const handleClose = () => setShow(!show);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="main-form-edit-project"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="title">
              <Form.Label className="label">Título:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  className="form-item"
                  required
                  isInvalid={title.trim() === ''}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Título inválido.
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
                required
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={description.trim() === ''}
              />
              <Badge
                className="form-item"
                text="primary"
                bg={`${description.length > 200 ? 'danger' : 'light'}`}
              >
                {description.length}/{200}
              </Badge>
              <Form.Control.Feedback type="invalid">
                Preencha a descrição.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="label">Data de Início:</Form.Label>
              <Form.Control
                type="date"
                required
                className="form-item"
                value={beginDate}
                onChange={(e) => setBeginDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Preencha a data de início.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label className="label">Data de Fim:</Form.Label>

              <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  isValid={Date.parse(beginDate) < Date.parse(endDate)}
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
                  Preencha o campo ou a data de fim não pode ser anterior a data
                  de início.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                }}
              >
                <Button
                  style={{ width: '45%' }}
                  className="button"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Voltar
                </Button>

                <Button
                  style={{ width: '45%' }}
                  className="button"
                  type="submit"
                >
                  Salvar alterações
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProject;
