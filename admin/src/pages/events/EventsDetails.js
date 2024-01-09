import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EventDetails({ show, handleClose }) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Events Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table className="table caption-top table-bordered table-striped table-hover text-center">
              <caption>List of Events</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>  
                  <td>@mdo</td>
                </tr>   
                <tr>      
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EventDetails;
