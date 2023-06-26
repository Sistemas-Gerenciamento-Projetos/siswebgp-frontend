import "./invite-users.styles.scss";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { EMAIL_ID, TEMPLATE_ID, PUBLIC_ID_KEY } from "../../../constants/urls";
import { Form, Button, InputGroup, Badge } from "react-bootstrap";
import { useProjectDetails } from "../../../context/projectContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const InviteUsers = () => {
  const form = useRef();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [projectDetails] = useProjectDetails();

  const submitHandler = (e) => {
    e.preventDefault();

    const content_email = {
      name: projectDetails.projectName,
      message: message,
      email: email,
    };
    console.log(projectDetails.projectName);
    emailjs.send(EMAIL_ID, TEMPLATE_ID, content_email, PUBLIC_ID_KEY).then(
      (result) => {
        setEmail("");
        setMessage("");
        toast.success("Email enviado com sucesso", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <>
      <Form ref={form} className="form-invite" onSubmit={submitHandler}>
        <Form.Label className="mt-2" htmlFor="text">
          <p>Enviar convite para novo membro para equipe.</p>
        </Form.Label>
        <Form.Group controlId="name" className="email mb-4 mt-2">
          <Form.Label className="label mt-2">Email:</Form.Label>

          <Form.Control
            type="email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-item"
          />

          <Form.Group controlId="message">
            <Form.Label className="label mt-2">Mensagem:</Form.Label>
            <Form.Control
              as="textarea"
              maxLength={200}
              rows={3}
              type="text"
              value={message}
              className="form-item"
              required
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Badge
              className="form-item"
              text="primary"
              bg={`${message.length > 200 ? "danger" : "light"}`}>
              {message.length}/{200}
            </Badge>
            <Form.Control.Feedback type="invalid">
              Preencha a mensagem.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Group>

        <Button className="btn-submit" type="submit" variant="primary">
          Enviar
        </Button>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};
export default InviteUsers;
