import React from "react";
import { Button } from "react-bootstrap";
import TrashIcon from "../../Assets/trash.svg";
import EditIcon from "../../Assets/edit.svg";
import AddIcon from "../../Assets/person-add.svg";

function ActionButtons({ setShow, setIndex }) {
  const handleClick = () => {
    setShow(true);
    setIndex(1);
  };

  return (
    <div>
      {/* <Button
        variant="outline-light"
        style={{ border: 0 }}
      >
        <img src={AddIcon} />
      </Button> */}
      <Button
        variant="outline-light"
        style={{ border: 0 }}
        onClick={handleClick}>
        <img src={EditIcon} />
      </Button>
      <Button variant="outline-light" style={{ border: 0 }}>
        <img src={TrashIcon} />
      </Button>
    </div>
  );
}

export default ActionButtons;
