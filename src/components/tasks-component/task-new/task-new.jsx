import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup, Badge } from "react-bootstrap";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { postTask } from "../../../services/tasks/postTask";
import { patchTask } from "../../../services/tasks/patchTask";
import { getUsers } from "../../../services/projects/getUsers";

import "./task-new.scss";

const options = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const NewTask = ({
  titleTask,
  textButton,
  actionTask,
  show,
  setShow,
  task,
  setTaskSelected,
}) => {
  const handleClose = () => {
    setShow(false);
    setTaskSelected(false);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [usersName, setUsersName] = useState([]);

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [errors, setErrors] = useState({});
  const [validated, setvalidated] = useState(false);
  const [status, setStatus] = useState("TODO");
  const newEditedTask = { ...task };

  const [updateTasks, setUpdateTasks] = useState(false);

  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
    setvalidated(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title || title === "") newErrors.title = "Preencha o título.";
    if (!description || description === " ")
      newErrors.description = "Preencha descrição.";
    if (!beginDate || beginDate === "") newErrors.beginDate = "Data de início.";
    if (
      !deadlineDate ||
      deadlineDate === "" ||
      Date.parse(beginDate) > Date.parse(deadlineDate)
    )
      newErrors.deadlineDate = "Data de fim.";

    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (actionTask === 0) {
        createTask();
      }
      if (actionTask === 1) {
        console.log(task);
        console.log(actionTask);
        await editTask();
      }

      setvalidated(true);
      handleReset();
      handleClose();
    }
  };

  const createTask = () => {
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

  const editTask = async () => {
    newEditedTask.title = title;
    newEditedTask.description = description;
    newEditedTask.beginDate = beginDate;
    newEditedTask.deadlineDate = deadlineDate;
    await patchTask(userDetails, projectDetails, newEditedTask, setUpdateTasks);
    setShow(true);
  };

  useEffect(() => {
    getUsers(userDetails, projectDetails, setUsersName);
    if (task) {
      setTitle(task.title);
      setBeginDate(task.start_date.substring(0, 10));
      setDeadlineDate(task.deadline_date.substring(0, 10));
      setDescription(task.description);
    } else {
      setTitle("");
      setBeginDate("");
      setDeadlineDate("");
      setDescription("");
      // setUsersName([]);°
    }
  }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleTask}</Modal.Title>
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
                {usersName.map(({ id, name }) => (
                  <option key={id}>{name}</option>
                ))}
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
                {textButton}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewTask;
