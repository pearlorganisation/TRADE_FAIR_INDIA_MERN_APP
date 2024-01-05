import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const FaqDetailsModal = (props) => {
  const { viewData } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Faq Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Q{viewData?.index + 1}. {viewData?.question || "N.A"}
        </h4>
        <p>
          <span className="fw-bold p-1">Ans.</span>
          {viewData?.answer || "N.A"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FaqDetailsModal;
