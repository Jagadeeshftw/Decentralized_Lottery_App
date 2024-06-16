"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import ParticipateModal from "./ParticipateModal";

const ParticipateModalClient = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-light"
        size="lg"
        className="px-4"
        onClick={handleShow}
      >
        How to Participate
      </Button>

      <ParticipateModal show={show} onHide={handleClose} />
    </>
  );
};

export default ParticipateModalClient;
