import React from "react";
import { Button } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "buttonstatus.scss";

export default function Buttonstatus() {
  return (
    <div>
      <UncontrolledDropdown group>
        <Button color="primary"> Em Andamento </Button>
        <DropdownToggle caret color="primary" />
        <DropdownMenu>
          <DropdownItem> Em Andamento </DropdownItem>
          <DropdownItem> Concluído </DropdownItem>
          <DropdownItem> Pausado </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
