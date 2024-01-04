import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import style from "./Faq.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GrFormAdd } from "react-icons/gr";

import TableSkeletonLoading from "../../../components/common/TableSkeletonLoading";

import { isUserHavePermission } from "../../../utils";
import FaqDetailsModal from "./FaqDetailsModal";
import { deleteFaq, fetchFaqList } from "../../../features/actions/faqActions";

// -------------------------------------------------------------------------------------------------

const FetchFaqs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [faqDetails, setFaqDetails] = useState({});
  const { loggedInUserData } = useSelector((state) => state.auth);
  const { faqData, isLoading } = useSelector((state) => state.faq);

  // This method is used to delete shop.
  const handleDeleteVenue = (faqId) => {
    confirmAlert({
      title: "Venue Delete Confirmation",
      message: "Are you sure you want to delete this venue?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteFaq(faqId));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(fetchFaqList());
  }, []);

  //--------------------------------

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Faq's Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            <Button
              size="md"
              title="Create New Shop"
              variant="info"
              className="d-flex align-items-center"
              onClick={() => {
                navigate("/client/addFaq");
              }}
            >
              <GrFormAdd className={style.aicon} size={25} />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="">
                    <th>S.No</th>
                    <th>Faq</th>
                    <th>Answwer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={4} />
                  ) : Array.isArray(faqData) && faqData?.length > 0 ? (
                    faqData?.map((item, index) => {
                      return (
                        <tr style={{ verticalAlign: "middle" }}>
                          <td>{index + 1}</td>
                          <td>{item?.question?.slice(0, 20)}</td>

                          <td>{item?.answer?.slice(0, 20)}</td>

                          <td>
                            <div className="d-flex h-100 justify-content-center gap-3">
                              <Button
                                variant="info"
                                size="md"
                                title="View Complete Details"
                                onClick={() => {
                                  setFaqDetails({ ...item, index });
                                  setShowCompleteDetailsModal(true);
                                }}
                              >
                                <BiSolidShow />
                              </Button>

                              {isUserHavePermission(loggedInUserData?.role) && (
                                <Button
                                  variant="warning"
                                  size="md"
                                  title="Edit Shop Details"
                                  onClick={() =>{}
                                    // navigate("/venue/updateVenue", {
                                    //   state: item,
                                    // })
                                  }
                                >
                                  <FaEdit />
                                </Button>
                              )}
                              {isUserHavePermission(loggedInUserData?.role) && (
                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Shop"
                                  onClick={() => handleDeleteVenue(item?._id)}
                                >
                                  <MdDelete />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5 text-center">No Venue Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <FaqDetailsModal
            show={showCompleteDetailsModal}
            onHide={() => setShowCompleteDetailsModal(false)}
            viewData={faqDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default FetchFaqs;
