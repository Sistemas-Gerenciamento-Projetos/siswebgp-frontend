import React from 'react';
import { Navbar } from 'reactstrap';
import { Button } from "reactstrap";
import './header.css';

function Header() {
  return (

<div>
  <Navbar className='navbar'>
      Projeto 1 - XXXX
      <div className='buttongroup'>
      <Button color='primary' >Novo Membro</Button>
      <Button color='primary' >Sair</Button>
      </div>
  </Navbar> 
</div>
  );
}

export default Header;
  