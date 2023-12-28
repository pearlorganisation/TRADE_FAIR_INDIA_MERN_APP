import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Category.module.css";

// -----------------------------------------------------------------------------------

const ViewCategoryDetails = ({ shopData, show, hide }) => {
  const {
    _id,
    shopName,
    state,
    city,
    shopAddress,
    email,
    primaryPhoneNumber,
    websiteUrl,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    aboutUs,
    bio,
    searchKeywords,
  } = shopData;
  return (
    <section>
      <Modal
        show={show}
        onHide={() => hide()}
        aria-labelledby="shop-details-modal"
        backdrop="static"
        keyboard={false}
        dialogClassName={styles.modalWidth}
        contentClassName={styles.modalHeight}
      >
        <Modal.Header closeButton>
          <Modal.Title id="shop-details-modal">
            Category Complete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Category</th>
                  <td>{shopData.category || "N.A"}</td>
                </tr>
                <tr>
                  <th>Sub Category</th>
                  <td>
                    <ol className="p-0">
                      {shopData.productCategories.map((el, i) => (
                        <li key={i}>{el.productCategory}</li>
                      ))}
                    </ol>
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

export default ViewCategoryDetails;

// ------------------------------------------- THE END -------------------------------------------
