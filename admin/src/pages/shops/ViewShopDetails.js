import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Shops.module.css";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "react-bootstrap";
import moment from "moment";

// -----------------------------------------------------------------------------------

const ViewShopDetails = ({ shopData, show, hide }) => {
  const {
    _id,
    shopName,
    logo,
    state,
    city,
    shopAddress,
    emailAddress,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    otherPhoneNumber,
    whatsappNo,
    websiteUrl,
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    aboutUs,
    bio,
    searchKeywords,
    importExport,
    customization,
    registrationDate,
    category,
    productCategories,
    pdfList,
    shopUrl,
    createdBy,
    updatedAt,
  } = shopData;

  const filteredProductCategoried = category?.flatMap((cate)=>{
    const filteredProductCate = cate.productCategories.filter((productCategroy)=>{
      return productCategories.includes(productCategroy._id)
    })
    return filteredProductCate
  })
  console.log(filteredProductCategoried)
  const { statesList } = useSelector((state) => state.global);
  const { categoriesList } = useSelector((state) => state.category);

  // This method is used to find State Name based on state iso code.
  const findStateNameBasedOnStateCode = (stateCode) => {
    if (Array.isArray(statesList) && statesList?.length > 0) {
      const state = statesList.find((state) =>
        state?.isoCode === stateCode ? state?.name : ""
      );
      return state?.name || "N.A";
    }
  };

  // This method is used to find category Name based on category _id.
  const findCategoryNameBasedOnCategoryId = (catId) => {
    if (Array.isArray(categoriesList) && categoriesList?.length > 0) {
      const category = categoriesList.find((category) =>
        category?._id === catId ? category?.category : ""
      );
      return category?.category || "N.A";
    }
  };

  // Download QR Code Functionality - Start

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `shop-qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={shopUrl ? shopUrl : ""}
      size={250}
      bgColor="white"
    />
  );
  // Download QR Code Functionality - finish

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
            Shop Complete Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <section>
            <Table striped bordered hover id="shop-details-in-table">
              <tbody>
                <tr>
                  <th>Shop's Id</th>
                  <td className="text-danger">
                    <b>{_id || "N.A"}</b>
                  </td>
                </tr>
                <tr>
                  <th>Shop's Name</th>
                  <td>{shopName || "N.A"}</td>
                </tr>
                <tr>
                  <th>Shop's Logo</th>
                  <td>
                    <img
                      width={100}
                      height={100}
                      src={logo?.path || "N.A"}
                      alt="shop"
                    />
                  </td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>{findStateNameBasedOnStateCode(state) || "N.A"}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{city || "N.A"}</td>
                </tr>

                <tr>
                  <th>Shop's Address</th>
                  <td>{shopAddress || "N.A"}</td>
                </tr>
                <tr>
                  <th>Email Address</th>
                  <td>{emailAddress || "N.A"}</td>
                </tr>

                <tr>
                  <th>Primary Phone Number </th>
                  <td>{primaryPhoneNumber?.toString() || "N.A"}</td>
                </tr>

                <tr>
                  <th>Secondary Phone Number </th>
                  <td>{secondaryPhoneNumber?.toString() || "N.A"}</td>
                </tr>

                <tr>
                  <th>Other Phone Number </th>
                  <td>{otherPhoneNumber?.toString() || "N.A"}</td>
                </tr>

                <tr>
                  <th>WhatsApp Phone Number </th>
                  <td>{whatsappNo?.toString() || "N.A"}</td>
                </tr>

                <tr>
                  <th>Website</th>
                  <td>{websiteUrl || "N.A"}</td>
                </tr>
                <tr>
                  <th>Facebook Url</th>
                  <td>{facebookUrl || "N.A"}</td>
                </tr>
                <tr>
                  <th>Instagram Url</th>
                  <td>{instagramUrl || "N.A"}</td>
                </tr>

                <tr>
                  <th>LinkedIn Url</th>
                  <td>{linkedInUrl || "N.A"}</td>
                </tr>

                {shopUrl && (
                  <>
                    <tr>
                      <th>Dynamic Shop's Url</th>
                      <td>
                        <a href={shopUrl} target="_blank">
                          {shopUrl || "N.A"}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th> Shop's QR Code</th>
                      <td>
                        <div ref={qrRef}>{qrcode}</div>
                        <form onSubmit={downloadQRCode}>
                          <Button
                            className="btn btn-md btn-success"
                            type="submit"
                            disabled={!shopUrl}
                          >
                            Download Shop's QR code
                          </Button>
                        </form>
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <th>About Us</th>
                  <td>{aboutUs || "N.A"}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>{bio || "N.A"}</td>
                </tr>

                <tr>
                  <th>Shop's Registration Date</th>
                  <td className="fw-bold">{registrationDate || "N.A"}</td>
                </tr>
                <tr>
                  <th>Search Keywords</th>
                  <td>
                    {Array.isArray(searchKeywords) &&
                      searchKeywords?.length > 0 &&
                      searchKeywords.map((search, i) => {
                        return <div key={i}> ■ {search}</div>;
                      })}
                  </td>
                </tr>

                <tr>
                  <th>Is Import/Export Available?</th>
                  <td>{importExport ? "YES" : "NO" || "N.A"}</td>
                </tr>

                <tr>
                  <th>Is Customization Available?</th>
                  <td>{customization ? "YES" : "NO" || "N.A"}</td>
                </tr>

                <tr>
                  <th>Categories List</th>
                  <td>
                    {Array.isArray(category) && category?.length > 0 ? (
                      category.map((cat, i) => {
                        return (
                          <div key={i}>
                            ■ {findCategoryNameBasedOnCategoryId(cat?._id)}
                          </div>
                        );
                      })
                    ) : (
                      <>N.A</>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Product Categories List</th>
                  <td>
                    {Array.isArray(filteredProductCategoried) &&
                    filteredProductCategoried?.length > 0 ? (
                      filteredProductCategoried.map((product, i) => {
                        return (
                          <div key={i}>
                            ■ {product?.productCategory}
                          </div>
                        );
                      })
                    ) : (
                      <>N.A</>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>
                    {/* {createdAt
                      ? moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")
                      : "N.A"} */}
                      {
createdBy?.name || "N.A"
                      }
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
                  <th>Shop's Documents List</th>
                  <td>
                    {Array.isArray(pdfList) && pdfList?.length > 0 ? (
                      pdfList?.map((pdf, i) => {
                        return (
                          <div key={i}>
                            <embed
                              src={pdf?.path || "N.A"}
                              width="400"
                              height="400"
                              className="m-3"
                              title={pdf?.originalname}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <>N.A</>
                    )}
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

export default ViewShopDetails;

// ------------------------------------------- THE END -------------------------------------------
