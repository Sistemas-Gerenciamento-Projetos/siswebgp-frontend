import React, { useState, useRef } from "react";
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
import "./task-new.scss";

const Newtask = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [errors, setErrors] = useState({});
  const [validated, setvalidated] = useState(false);
  const status = "TODO";

  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
    setvalidated(false);
    console.log(formRef);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title || title === "") newErrors.title = "Preencha o título.";
    if (!description || description === " ")
      newErrors.description = "Preencha descrição.";
    if (!beginDate || beginDate == "") newErrors.beginDate = "Data de início.";
    if (
      !deadlineDate ||
      deadlineDate == "" ||
      Date.parse(beginDate) > Date.parse(deadlineDate)
    )
      newErrors.deadlineDate = "Data de fim.";

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      postTask(
        userDetails,
        projectDetails,
        title,
        description,
        beginDate,
        deadlineDate,
        status
      );
      setvalidated(true);
      handleReset();
      handleClose();
    }
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
          <Form
            ref={formRef}
            noValidate
            validated={validated}
            onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="label">Título:</Form.Label>

              <Form.Control
                type="text"
                placeholder="Digite o título da tarefa"
                required
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
              <Form.Select required>
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
                  <Form.Label className="label">Data de início:</Form.Label>
                  <Form.Control
                    type="date"
                    required
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
                  <Form.Label className="label">Data de fim</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="date"
                      isInvalid={!!errors.deadlineDate}
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
                      {errors.deadlineDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group
              className="mb-3"
              controlId="description"
              style={{ marginTop: "1rem" }}>
              <Form.Label className="label">Descrição:</Form.Label>
              <Form.Control
                as="textarea"
                maxLength={200}
                type="text"
                rows={3}
                value={description}
                isInvalid={!!errors.description}
                required
                onChange={(e) => [setDescription(e.target.value)]}
              />
              <Badge
                className="form-item"
                text="primary"
                bg={`${description.length > 200 ? "danger" : "light"}`}>
                {description.length}/{200}
              </Badge>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid mt-4">
              <Button variant="primary" type="submit">
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
