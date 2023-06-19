import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./add-new-user.styles.scss";
import { useUserDetails } from "../../../context/usercontext";
import { getUsers } from "../../../services/users/getUsers";
import { postAddUserInProject } from "../../../services/projects/postAddUserInProject";
import { useProjectDetails } from "../../../context/projectContext";

const AddNewUser = () => {
  const [users, setUsers] = useState([])
  const [userDetails] = useUserDetails()
  const [projectDetails] = useProjectDetails();
  var selectedUserId = "";

  useEffect(() => {
    getUsers(userDetails.accessToken, setUsers)
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    postAddUserInProject(userDetails.accessToken, projectDetails.projectId, selectedUserId)
  }

  return (
    <Form className="main-add"
      noValidate
      onSubmit={handleSubmit}>
      <Form.Label>Pesquisar usuário:</Form.Label>

      <Form.Control
        as="select"
        onChange={(e) => selectedUserId = e.target.value}>
        {users.map((user, index) => (
          <option key={index} value={user.id}>{user.name} | {user.email}</option>
        ))}
      </Form.Control>

      <Button
        className="btn-submit mt-4"
        type="submit"
        variant="primary">
        Adicionar
      </Button>
    </Form>
  );
};

export default AddNewUser;
