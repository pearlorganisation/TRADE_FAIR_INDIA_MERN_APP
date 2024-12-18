import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoading from "../../../components/common/TableSkeletonLoading";

import moment from "moment";
import { isUserHavePermission } from "../../../utils";
import {
  deleteEventCategory,
  fetchEventCategory,
} from "../../../features/actions/eventCategory";
import EventCategoryDetailsModal from "./EventCategoryDetailsModal";

// ------------------------------------------------------------------------------------

const FetchEventCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { eventCategoryList, isLoading } = useSelector(
    (state) => state?.eventCategory
  );

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedEventCategoryDetails, setSelectedEventCategoryDetails] =
    useState({});

  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete event category.
  const handleEventCategory = (id) => {
    confirmAlert({
      title: "Event category Delete Confirmation",
      message: "Are you sure you want to delete this event category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteEventCategory(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // -------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(fetchEventCategory());
  }, []);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Event category Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(loggedInUserData?.role) && (
              <Button
                size="md"
                title="Create New Role"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/client/addEventCategory");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Col>
              <Col style={{ textAlign: "right" }} className="text-info fs-6">
                Click on view icon to see complete details
              </Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th>Event category Id</th>
                    <th>Event Category</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={7} />
                  ) : Array.isArray(eventCategoryList) &&
                    eventCategoryList?.length > 0 ? (
                    eventCategoryList?.map((eCategory, i) => {
                      return (
                        <tr key={eCategory?._id || i}>
                          <td>{i + 1}</td>
                          <td>{eCategory?._id || "N.A"}</td>

                          <td>{eCategory?.category}</td>
                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            <Button
                              variant="info"
                              size="md"
                              title="View Complete Details"
                              onClick={() => {
                                setSelectedEventCategoryDetails(eCategory);
                                setShowCompleteDetailsModal(true);
                              }}
                            >
                              <BiSolidShow />
                            </Button>

                            {isUserHavePermission(loggedInUserData?.role) && (
                              <>
                                <Button
                                  variant="warning"
                                  size="md"
                                  title="Edit Role "
                                  onClick={() =>
                                    navigate(
                                      `/client/updateEventCategory/${eCategory._id}`,
                                      {
                                        state: eCategory,
                                      }
                                    )
                                  }
                                >
                                  <FaEdit />
                                </Button>

                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Role"
                                  onClick={() =>
                                    handleEventCategory(eCategory?._id)
                                  }
                                >
                                  <MdDelete />
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5 text-center">
                      No Event category Found
                    </h5>
                  )}
                </tbody>
              </Table>
              {showCompleteDetailsModal && (
                <EventCategoryDetailsModal
                  show={showCompleteDetailsModal}
                  hide={() => setShowCompleteDetailsModal(false)}
                  data={selectedEventCategoryDetails}
                />
              )}
            </Col>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FetchEventCategories;
