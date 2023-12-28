import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Role.module.css";
import moment from "moment";

// -----------------------------------------------------------------------------------

const ViewRoleDetails = ({ roleData, show, hide }) => {
  const { _id, role, createdAt, updatedAt, createdBy, permissions } = roleData;

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
            Role's Complete Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Role's Id</th>
                  <td className="text-danger">
                    <b>{_id || "N.A"}</b>
                  </td>
                </tr>
                <tr>
                  <th>Role Name</th>
                  <td>{role || "N.A"}</td>
                </tr>

                <tr>
                  <th>Assigned Permissions</th>
                  <td>
                    <ul className="px-0">
                      {permissions.map((per, i) => {
                        return (
                          <li className="m-0 p-0" key={i}>
                            {`■ ${per?.permission}` || "N.A"}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th>Created At</th>
                  <td>
                    {createdAt
                      ? moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")
                      : "N.A"}
                  </td>
                </tr>

                <tr>
                  <th>Last Updated At</th>
                  <td>
                    {updatedAt
                      ? moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")
                      : "N.A"}
                  </td>
                </tr>

                <tr>
                  <th>Created By (Full Name - Email Address)</th>
                  <td>
                    {" "}
                    {createdBy?.name || "N.A"} - {createdBy?.email || "N.A"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ViewRoleDetails;

// ------------------------------------------- THE END -------------------------------------------
