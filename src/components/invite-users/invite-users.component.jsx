import "./invite-users.styles.scss";
import React, { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";

const InviteUsers = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    setErrors(validateForm());
  }, [email]);

  const validateForm = () => {
    const newErrors = {};
    if (
      !email ||
      email === " " ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    )
      newErrors.email = "Verifique o email.";
    return newErrors;
  };

  return (
    <Form className="form-invite">
      <Form.Label htmlFor="text">
        Enviar convite para novo membro para equipe.
      </Form.Label>
      <Form.Group controlId="email" className="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-item"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        className="btn-submit"
        type="submit"
        onClick={submitHandler}
        variant="primary"
        disabled={false}>
        Enviar
      </Button>
    </Form>
  );
};
export default InviteUsers;
