import React, { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup, Badge } from "react-bootstrap";
import "./new-project.scss";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { patchProject } from "../../services/projects/patchProject";

const Registration = ({
  postProject,
  novoProjeto,
  setNovoProjeto,
  //userDetails,
  setIndex,
  textButton,
  actionProject,
  show,
  setShow,
  project,
  setProjectSelected

}) => {
  const handleClose = () => {
    setShow(false);
    setProjectSelected(false);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validated, setValidated] = useState(false);

  const [errors, setErrors] = useState({});
  //const [usersName, setUsersName] = useState([]);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const newEditedProject = { ...project };
  const [updateProject, setUpdateProject] = useState(false);

  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
    setValidated(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title || title === "") newErrors.title = "Preencha o título.";
    if (!description || description === " ")
      newErrors.description = "Preencha descrição.";
    if (!beginDate || beginDate === "") newErrors.beginDate = "Data de início.";
    if (
      !endDate ||
      endDate === "" ||
      Date.parse(beginDate) > Date.parse(endDate)
    )
      newErrors.endDate = "Data de fim.";

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (actionProject === 0) {
        createProject();
      }
      if (actionProject === 1) {
        console.log(project);
        console.log(actionProject);
        await editProject();
      }

      setValidated(true);
      handleReset();
      handleClose();
    }
  
  };
    //const form = event.currentTarget;
    //if (form.checkValidity() === false) {
    //  setValidated(true);
    //  return;
    //}

    const createProject = () => {
      postProject(
        novoProjeto,
        setNovoProjeto,
        userDetails,
        title,
        description,
        beginDate,
        endDate
      )
      setIndex(0)
    };
    
    const editProject = async () => {
      newEditedProject.title = title;
      newEditedProject.description = description;
      newEditedProject.beginDate = beginDate;
      newEditedProject.endDate = endDate;
      await patchProject(userDetails, projectDetails, newEditedProject, setUpdateProject);
      setShow(true);
    };
  
    /*useEffect(() => {
      getUsers(userDetails, projectDetails, setUsersName);
      if (project) {
        setTitle(project.title);
        setBeginDate(project.start_date.substring(0, 10));
        setDeadlineDate(project.deadline_date.substring(0, 10));
        setDescription(project.description);
      } else {
        setTitle("");
        setBeginDate("");
        setDeadlineDate("");
        setDescription("");
        // setUsersName([]);°
      }
    }, [show]);
    */

  return (
    <Form
      className="main-form-new-project"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}>
      ref={formRef}
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
          required
          isInvalid={!!errors.description}
          onChange={(e) => setDescription(e.target.value)}
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

      <Form.Group>
        <Form.Label className="label">Data de Início:</Form.Label>
        <Form.Control
          type="date"
          required
          isInvalid={!!errors.beginDate}
          className="form-item"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.beginDate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label className="label">Data de Fim:</Form.Label>

        <InputGroup hasValidation>
          <Form.Control
            type="date"
            isInvalid={!!errors.endDate}
            isValid={Date.parse(beginDate) < Date.parse(endDate)}
            min={
              beginDate === ""
                ? new Date().toISOString().split("T")[0]
                : beginDate
            }
            disabled={beginDate === ""}
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
      <div className="d-grid mt-4">
        <Button type="submit">
          {textButton}
        </Button>
      </div>
    </Form>
  );
};

export default Registration;
