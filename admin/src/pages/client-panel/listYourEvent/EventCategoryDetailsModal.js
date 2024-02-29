import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./EventCategory.module.css";

const EventCategoryDetailsModal = ({ data, show, hide }) => {
  return (
    <section>
      <Modal
        show={show}
        onHide={() => hide()}
        aria-labelledby="user-details-modal"
        backdrop="static"
        keyboard={false}
        dialogClassName={styles.modalWidth}
        contentClassName={styles.modalHeight}
      >
        <Modal.Header closeButton>
          <Modal.Title id="user-details-modal">
            Event categorycomplete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Event URL Id</th>

                  <td>
                    <b>{data?._id || "N.A"}</b>
                  </td>
                </tr>
                <tr>
                  <th>URL</th>
                  <td>{data?.url || "N.A"}</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default EventCategoryDetailsModal;
