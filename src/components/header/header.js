import React, { useEffect } from "react";
import { Navbar, Button } from "reactstrap";
import "./header.css";
import { useUserDetails } from "../../context/usercontext";

function Header({ history }) {
  const [userDetails, updateUserDetails] = useUserDetails();

  const logoutHandler = () => {
    console.log("it is working");
    localStorage.removeItem("userDetails");
    updateUserDetails(false, false);
  };

  return (
    <div>
      <Navbar className="navbar">
        Projeto 1 - XXXX
        <div className="buttongroup">
          <Button color="primary">Novo Membro</Button>
          <Button onClick={() => console.log("test")} color="primary">
            Sair
          </Button>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
