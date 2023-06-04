import React from "react";
import { Form, Button } from "react-bootstrap";
import "./add-new-user.styles.scss";

const AddNewUser = () => {
  return (
    <Form className="main-add">
      <Form.Label>Pesquisar usuário:</Form.Label>

      <Form.Select className="">
        <option>Mustard</option>
        <option>Ketchup</option>
        <option>Relish</option>
      </Form.Select>

      <Button
        className="btn-submit mt-2"
        type="submit"
        onClick={""}
        variant="primary">
        Adicionar
      </Button>
    </Form>
  );
};

export default AddNewUser;

{
  /* <Form clasName="main-add mb-2">
  <Form.Select class="selectpicker" data-live-search="true">
    <option data-tokens="ketchup mustard">Hot Dog, Fries and a Soda</option>
    <option data-tokens="mustard">Burger, Shake and a Smile</option>
    <option data-tokens="frosting">Sugar, Spice and all things nice</option>
  </Form.Select>
  <Button
    className="btn-submit"
    type="submit"
    onClick={""}
    variant="primary"
    disabled={false}>
    Enviar
  </Button>
</Form>; */
}
