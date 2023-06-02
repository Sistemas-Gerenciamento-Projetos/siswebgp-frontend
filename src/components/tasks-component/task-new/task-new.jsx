import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Taskstatus from "../task-status/task-status";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup, Badge } from "react-bootstrap";
import axios from "axios";
import { TASKS_CREATE_ENDPOINT } from "../../../constants/urls";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { postTask } from "../../../services/tasks/postTask";

const Newtask = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const [validated, setValidated] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const status = "TODO";

  const handleSubmit = () => {
    postTask(
      userDetails,
      projectDetails,
      title,
      description,
      beginDate,
      deadlineDate,
      status
    );
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Nova Tarefa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Título:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Digite o título da tarefa"
                  required
                  isInvalid={!!title.trim() === ""}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Título inválido.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="users">
              <Form.Label>Responsável:</Form.Label>
              <Form.Select>
                <option>Abra o menu de seleção</option>
                <option value="1">Eduardo</option>
                <option value="2">Bruno</option>
                <option value="3">Alberto</option>
                <option value="4">Rebeca</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="starDate">
                  <Form.Label>Data de início:</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={beginDate}
                    onChange={(e) => [setBeginDate(e.target.value)]}
                  />
                  <Form.Control.Feedback type="invalid">
                    Preencha a data de início.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="endDate">
                  <Form.Label>Data de fim</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      isValid={Date.parse(beginDate) < Date.parse(deadlineDate)}
                      min={
                        beginDate === ""
                          ? new Date().toISOString().split("T")[0]
                          : beginDate
                      }
                      disabled={beginDate === ""}
                      required
                      value={deadlineDate}
                      onChange={(e) => [setDeadlineDate(e.target.value)]}
                    />
                    <Form.Control.Feedback type="invalid">
                      Preencha o campo ou a data de fim não pode ser anterior a
                      data de início.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="description"
              style={{ marginTop: "1rem" }}>
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={200}
                type="text"
                rows={3}
                value={description}
                required
                onChange={(e) => [setDescription(e.target.value)]}
              />
              <Badge
                className="form-item"
                bg={`${description.length > 200 ? "danger" : "primary"}`}>
                {description.length}/{200}
              </Badge>
              <Form.Control.Feedback type="invalid">
                Preencha a descrição.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid mt-4">
              <Button variant="primary" onClick={handleSubmit}>
                Criar tarefa
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Newtask;
