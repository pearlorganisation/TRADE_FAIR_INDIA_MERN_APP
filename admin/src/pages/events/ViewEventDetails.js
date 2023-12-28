import React, { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Events.module.css";
import { QRCodeCanvas } from "qrcode.react";
import Button from "react-bootstrap/Button";

// -----------------------------------------------------------------------------------

const ViewEventDetails = ({ show, hide, viewEvent }) => {
  // Download QR Code Functionality - Start

  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `event-qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={viewEvent?.eventUrl ? viewEvent?.eventUrl : ""}
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
            Event Complete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Event Logo</th>
                  <td>
                    {" "}
                    <img
                      width={100}
                      height={100}
                      src={viewEvent?.eventLogo?.path || "N.A"}
                      alt="event  "
                    />
                  </td>
                </tr>
                <tr>
                  <th>Event Name</th>
                  <td> {viewEvent?.eventName}</td>
                </tr>
                <tr>
                  <th>Venue</th>
                  <td> {viewEvent?.venue?.PlaceName}</td>
                </tr>

                {viewEvent?.eventUrl && (
                  <>
                    <tr>
                      <th scope="col">Dynamic Events's Url</th>
                      <td>
                        <a href={viewEvent?.eventUrl} target="_blank">
                          {viewEvent?.eventUrl || "N.A"}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th> Events's QR Code</th>
                      <td>
                        <div ref={qrRef}>{qrcode}</div>
                        <form onSubmit={downloadQRCode}>
                          <Button
                            className="btn btn-md btn-success"
                            type="submit"
                            disabled={!viewEvent?.eventUrl}
                          >
                            Download Event's QR code
                          </Button>
                        </form>
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <th>Category</th>
                  <td> Category</td>
                </tr>

                <tr>
                  <th>Age Group</th>
                  <td> {viewEvent?.ageGroup}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{viewEvent?.description}</td>
                </tr>
                <tr>
                  <th>Why should you attend this</th>
                  <td> {viewEvent?.attendReason}</td>
                </tr>
                <tr>
                  <th>Terms and conditions</th>
                  <td> {viewEvent?.termsConditions}</td>
                </tr>
                <tr>
                  <th>Rules and Regulation</th>
                  <td> {viewEvent?.rules}</td>
                </tr>
                <tr>
                  <th>Event Banner</th>
                  <td>
                    {" "}
                    
                        <img
                          width={100}
                          height={100}
                          src={viewEvent?.eventBanner?.path || "N.A"}
                          alt="event  "
                        />
                     
                  </td>
                </tr>
                <tr>
                  <th>Event Pdf</th>
                  <td>
                    {Array.isArray(viewEvent?.eventBrochure) && viewEvent?.eventBrochure?.length > 0 ? (
                      viewEvent?.eventBrochure?.map((pdf, i) => {
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
                <tr>
                  <th>Event Location</th>
                  <td>N.A</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>
                    {" "}
                    {/* <a href={`${viewEvent?.website}`}> */}
                    {viewEvent?.website}
                    {/* </a>{" "} */}
                  </td>
                </tr>
                <tr>
                  <th>Cycle</th>
                  <td> {viewEvent?.cycle}</td>
                </tr>
                <tr>
                  <th>Event Date</th>
                  <td> <span className="fw-bold">From</span> { new Date(`${viewEvent?.eventDate[0]}`).toISOString().split("T")[0]} - 
                  <span className="fw-bold"> To</span> : { new Date(`${viewEvent?.eventDate[1]}`).toISOString().split("T")[0]}
      </td>
                </tr>
                <tr>
                  <th>Organiser</th>
                  <td> {viewEvent?.organiser[0]?.companyName}</td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ViewEventDetails;
