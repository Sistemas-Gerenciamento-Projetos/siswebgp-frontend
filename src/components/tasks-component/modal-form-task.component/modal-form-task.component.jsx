import React, { useState, useRef, useEffect } from "react";
import { Button, InputGroup, Badge } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { patchTask } from "../../../services/tasks/patchTask";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { postTask } from "../../../services/tasks/postTask";
import { getUsersByProject } from "../../../services/users/getUsersByProject";

function ModalFormTask({
  show,
  setShow,
  titleAction,
  textButton,
  task,
  setUpdate,
  update,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [validated, setvalidated] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [status] = useState("TODO");

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const handleClose = () => {
    setShow(false);
  };
  const handleReset = () => {
    formRef.current.reset();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (titleAction === "Editar tarefa") {
      editTask();
    } else {
      createTask();
    }
    setUpdate(!update);
    handleReset();
    handleClose();
  };

  const editTask = async () => {
    console.log("edit");
    const newEditedTask = { ...task };
    newEditedTask.title = title;
    newEditedTask.description = description;
    newEditedTask.start_date = beginDate;
    newEditedTask.deadline_date = deadlineDate;
    await patchTask(userDetails, projectDetails, newEditedTask, setUpdate);
    setUpdate(!update);
    console.log(newEditedTask);
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
    setUpdate(!update);
  };

  const handleUser = (id, name) => {
    setNameUser(name);
    setIdUser(id);
  };

  useEffect(() => {
    getUsersByProject(userDetails, projectDetails, setListUsers);

    if (titleAction === "Editar tarefa") {
      setTitle(task.title);
      setBeginDate(task.start_date.substring(0, 10));
      setDeadlineDate(task.deadline_date.substring(0, 10));
      setDescription(task.description);
    } else {
      setTitle("");
      setBeginDate("");
      setDeadlineDate("");
      setDescription("");
    }
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleAction}</Modal.Title>
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
                {listUsers.map(({ id, name }) => (
                  <option onChange={() => handleUser(id, name)} key={id}>
                    {name}
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
                  <Form.Label className="label">Data de fim:</Form.Label>
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
}

export default ModalFormTask;

// const validateForm = () => {
//   const newErrors = {};

//   if (!title || title === "") newErrors.title = "Preencha o título.";
//   if (!description || description === " ")
//     newErrors.description = "Preencha descrição.";
//   if (!beginDate || beginDate === "") newErrors.beginDate = "Data de início.";
//   if (
//     !deadlineDate ||
//     deadlineDate === "" ||
//     Date.parse(beginDate) > Date.parse(deadlineDate)
//   )
//     newErrors.deadlineDate = "Data de fim.";

//   return newErrors;
// };
