import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import styles from "./Venue.module.css";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import Button from "react-bootstrap/Button";

// -----------------------------------------------------------------------------------

const ViewVenueDetails = ({ show, hide, viewData }) => {
  const { statesList } = useSelector((state) => state.global);

  const findStateNameBasedOnStateCode = (stateCode) => {
    if (Array.isArray(statesList) && statesList?.length > 0) {
      const state = statesList.find((state) =>
        state?.isoCode === stateCode ? state?.name : ""
      );
      return state?.name;
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
    anchor.download = `venue-qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={viewData?.venueUrl ? viewData?.venueUrl : ""}
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
            Venue Complete Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Name of Place</th>
                  <td> {viewData.PlaceName}</td>
                </tr>

                {viewData?.venueUrl && (
                  <>
                    <tr>
                      <th scope="col">Dynamic Venue's Url</th>
                      <td>
                        <a href={viewData?.venueUrl} target="_blank">
                          {viewData?.venueUrl || "N.A"}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th> Venue's QR Code</th>
                      <td>
                        <div ref={qrRef}>{qrcode}</div>
                        <form onSubmit={downloadQRCode}>
                          <Button
                            className="btn btn-md btn-success"
                            type="submit"
                            disabled={!viewData?.venueUrl}
                          >
                            Download Venue's QR code
                          </Button>
                        </form>
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <th>State</th>
                  <td>
                    {findStateNameBasedOnStateCode(viewData.State) || "N.A"}
                  </td>
                </tr>
                <tr>
                  <th>City</th>
                  <td> {viewData.City}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td> {viewData.Address}</td>
                </tr>
                <tr>
                  <th>Location of Event</th>
                  <td>
                    <a
                      href={`${viewData.GeoLocation?.locationUrl}`}
                      target="_blank"
                    >
                      {viewData?.GeoLocation?.loactionName}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Description of Place</th>
                  <td> {viewData.PlaceDescription}</td>
                </tr>
                <tr>
                  <th>Hotels NearBy</th>
                  <td style={{ display: "grid" }}>
                    {viewData.HotelNearby?.map((item, index) => {
                      return (
                        <span>
                          {index + 1}.{" "}
                          {/* <a href={`${item.link}`} target="_blank"> */}
                          {item.link.slice(0, 110)}
                          {/* </a> */}
                        </span>
                      );
                    })}
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

export default ViewVenueDetails;
