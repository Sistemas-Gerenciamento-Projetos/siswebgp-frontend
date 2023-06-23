import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./add-new-user.styles.scss";
import { useUserDetails } from "../../../context/usercontext";
import { getUsers } from "../../../services/users/getUsers";
import { postAddUserInProject } from "../../../services/projects/postAddUserInProject";
import { useProjectDetails } from "../../../context/projectContext";
import { toast } from "react-toastify";

const AddNewUser = ({ setIndex }) => {
  const [users, setUsers] = useState([]);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  var selectedUserId = "";

  function fetchUsersList() {
    getUsers(userDetails.accessToken, projectDetails.projectId, setUsers);
  }

  useEffect(() => {
    fetchUsersList();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (selectedUserId !== "") {
      postAddUserInProject(
        userDetails.accessToken,
        projectDetails.projectId,
        fetchUsersList,
        selectedUserId
      );
    } else {
      toast.error("Selecione um membro", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <Form className="main-add" noValidate onSubmit={handleSubmit}>
      <Form.Label>Pesquisar usuário:</Form.Label>

      <Form.Control
        as="select"
        onChange={(e) => (selectedUserId = e.target.value)}>
        <option key={0} value={""}>
          Selecione um usuário...
        </option>
        {users.map((user, index) => (
          <option key={index + 1} value={user.id}>
            {user.name} | {user.email}
          </option>
        ))}
      </Form.Control>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Button
          style={{ width: "45%" }}
          className="btn-submit mt-4"
          variant="secondary"
          onClick={() => setIndex(0)}>
          Voltar
        </Button>

        <Button
          style={{ width: "45%" }}
          className="btn-submit mt-4"
          type="submit"
          variant="primary">
          Adicionar
        </Button>
      </div>
    </Form>
  );
};

export default AddNewUser;
