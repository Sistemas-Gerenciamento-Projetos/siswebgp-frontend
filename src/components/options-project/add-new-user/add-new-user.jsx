import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./add-new-user.styles.scss";
import { useUserDetails } from "../../../context/usercontext";
import { getUsers } from "../../../services/users/getUsers";

const AddNewUser = () => {
  const [users, setUsers] = useState([])
  const [userDetails] = useUserDetails()

  useEffect(() => {
    getUsers(userDetails.accessToken, setUsers)
  }, []);

  return (
    <Form className="main-add">
      <Form.Label>Pesquisar usuário:</Form.Label>

      <Form.Select className="mt-2">
        {users.map((user, index) => (
          <option key={index}>{user.name} | {user.email}</option>
        ))}
      </Form.Select>

      <Button
        className="btn-submit mt-4"
        type="submit"
        onClick={() => {}}
        variant="primary">
        Adicionar
      </Button>
    </Form>
  );
};

export default AddNewUser;
