import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Organiser.module.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";

function ViewOrganiserDetails({ show, handleClose, organiserData }) {
  const {
    companyName,
    address,
    state,
    city,
    contactPerson,
    logo,
    images,
    websiteUrl,
    email,
    insta,
    fb,
    twitter,
    linkedIn,
    phoneNumber,
    organiserUrl,
  } = organiserData;

  const { statesList } = useSelector((state) => state.global);

  //Getting Full States Names
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
    anchor.download = `organiser-qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={organiserUrl ? organiserUrl : ""}
      size={250}
      bgColor="white"
    />
  );
  // Download QR Code Functionality - finish

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={styles.modalWidth}
        contentClassName={styles.modalHeight}
      >
        <Modal.Header closeButton>
          <Modal.Title>Organiser Complete Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <table className="table caption-top table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Company Name</th>
                  <td>{companyName}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">Email</th>
                  <td>{email}</td>
                </tr>
                <tr>
                  <th scope="col">Phone No.</th>
                  <td>{phoneNumber}</td>
                </tr>

                {organiserUrl && (
                  <>
                    <tr>
                      <th scope="col">Dynamic Organiser's Url</th>
                      <td>
                        <a href={organiserUrl} target="_blank">
                          {organiserUrl || "N.A"}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <th> Organiser's QR Code</th>
                      <td>
                        <div ref={qrRef}>{qrcode}</div>
                        <form onSubmit={downloadQRCode}>
                          <Button
                            className="btn btn-md btn-success"
                            type="submit"
                            disabled={!organiserUrl}
                          >
                            Download Organiser's QR code
                          </Button>
                        </form>
                      </td>
                    </tr>
                  </>
                )}

                <tr>
                  <th scope="col">Address</th>
                  <td>{address}</td>
                </tr>
                <tr>
                  <th scope="col">City</th>
                  <td>{city}</td>
                </tr>
                <tr>
                  <th scope="col">State</th>
                  <td>{findStateNameBasedOnStateCode(state) || "N.A"}</td>
                </tr>
                <tr>
                  <th scope="col">Logo</th>
                  <td>
                    {/* <a href={`${logo}`}>{logo?.slice(0, 60)}</a> */}
                    <img
                      width={100}
                      height={100}
                      src={logo}
                      alt="organiser"
                      className="mx-3"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="col">Images</th>
                  <td>
                    {Array.isArray(images) &&
                      images?.length > 0 &&
                      images?.map((item, i) => {
                        return (
                          <img
                            key={i}
                            width={100}
                            height={100}
                            src={item || "N.A"}
                            alt="organiser"
                            className="mx-3"
                          />
                        );
                      })}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Contact Person Name</th>
                  <td>
                    {organiserData?.contactPerson?.length > 0 &&
                      organiserData?.contactPerson?.map((contact, i) => {
                        return (
                          <div key={i}> ■ {contact?.contactPersonName}</div>
                        );
                      })}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Contact Person Number</th>
                  <td>
                    {organiserData?.contactPerson?.length > 0 &&
                      organiserData?.contactPerson?.map((contact, i) => {
                        return <div key={i}> ■ {contact?.contactNumber}</div>;
                      })}
                  </td>
                </tr>
                <tr>
                  <th scope="col">Website Url</th>
                  <td>{websiteUrl}</td>
                </tr>
                <tr>
                  <th scope="col">FaceBook Url</th>
                  <td>{fb}</td>
                </tr>
                <tr>
                  <th scope="col">Instagram Url</th>
                  <td>{insta}</td>
                </tr>
                <tr>
                  <th scope="col">Linkedin Url</th>
                  <td>{linkedIn}</td>
                </tr>
                <tr>
                  <th scope="col">Twitter Url</th>
                  <td>{twitter}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewOrganiserDetails;
