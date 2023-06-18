import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./add-new-user.styles.scss";
import { getUsers } from "../../../services/users/getUsers";
import { useUserDetails } from "../../../context/usercontext";

const AddNewUser = () => {
  const [users, setUsers] = useState([])
  const [userDetails] = useUserDetails()

  useEffect(() => {
    (async () => {
      console.log("chamando")
      setUsers(getUsers(userDetails.accessToken))
    })();
  }, []);


  return (
    <Form className="main-add">
      <Form.Label>Pesquisar usuário:</Form.Label>

      <Form.Select className="mt-2">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
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
