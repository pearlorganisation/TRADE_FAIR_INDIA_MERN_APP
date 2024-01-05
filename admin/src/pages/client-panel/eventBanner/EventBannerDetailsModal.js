import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./EventBanner.module.css";

const EventBannerDetailsModal = ({ data, show, hide }) => {
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
            Event banner complete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Event Banner Id</th>
                  <td>
                    <b>{data?._id || "N.A"}</b>
                  </td>
                </tr>
                <tr>
                  <th>Banner</th>
                  <td>
                    <div >
                     <img src={data?.banner || "N.A"} style={{width:"300px", height:"300px"}}/>
                    </div>
                    </td>
                </tr>
                <tr>
                  <th>Banner data</th>
                  <td>{data?.bannerData || "N.A"}</td>
                </tr>
                <tr>
                  <th>Active</th>
                  <td>{data?.active ? "True" : "False" || "N.A"}</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default EventBannerDetailsModal;
