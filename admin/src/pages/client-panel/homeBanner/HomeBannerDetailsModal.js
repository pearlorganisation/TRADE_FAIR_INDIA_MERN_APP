import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./HomeBanner.module.css";

const HomeBannerDetailsModal = ({ data, show, hide }) => {
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
            Sub banner complete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>banner id</th>
                  <td>
                    <b>{data?._id || "N.A"}</b>
                  </td>
                </tr>
                <tr>
                  <th>Banner</th>
                  <td>
                    <div>
                      <img
                        src={data?.banner || "N.A"}
                        style={{ width: "300px", height: "300px" }}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Banner data</th>
                  <td>{data?.bannerData || "N.A"}</td>
                </tr>

                <tr>
                  <th>Button Link</th>
                  <td>{data?.buttonLink}</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default HomeBannerDetailsModal;
