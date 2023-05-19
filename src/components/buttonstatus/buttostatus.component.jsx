import React from "react";
import { Button } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Buttonstatus() {
  return (
    <div>
      <UncontrolledDropdown group>
        <Button color="primary"> Em Andamento </Button>
        <DropdownToggle caret color="primary" />
        <DropdownMenu>
          <DropdownItem className="bt-progress"> Em Andamento </DropdownItem>
          <DropdownItem className="bt-sucess"> Concluído </DropdownItem>
          <DropdownItem className="bt-paused"> Pausado </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
