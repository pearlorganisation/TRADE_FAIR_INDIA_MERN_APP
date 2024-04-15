import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import ViewEventDetails from "./ViewEventDetails";
import style from "./Events.module.css";
import Pagination from "react-bootstrap/Pagination";

import { GrFormAdd } from "react-icons/gr";
import { EventPagination } from "./EventPagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  fetchEventList,
} from "../../features/actions/eventAction";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import { isUserHavePermission } from "../../utils";

// -------------------------------------------------------------------------------------------------

const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Dynamic handling of buttons  as per role
  const { loggedInUserData } = useSelector((state) => state.auth);

  const { eventsList, isLoading } = useSelector((state) => state.event);

  const [event, setEvent] = useState({});

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  // This method is used to delete shop.
  const handleDeleteShop = (eventId) => {
    confirmAlert({
      title: "Event Delete Confirmation",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteEvent({ eventId: eventId })),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(fetchEventList());
  }, [dispatch]);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Event's Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(
              loggedInUserData?.role,
              loggedInUserData?.permissions,
              "CREATE_EVENT"
            ) && (
              <Button
                size="md"
                title="Create New Shop"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/createEvent");
                }}
              >
                <GrFormAdd className={style.aicon} size={25} />
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th>Organiser</th>
                    <th>Name of Event</th>
                    <th>Venue</th>
                    <th>AgeGroup</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={6} />
                  ) : Array.isArray(eventsList) && eventsList.length > 0 ? (
                    eventsList?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item?.organiser?.[0]?.companyName}</td>
                          <td>{item?.eventName}</td>
                          <td>{item?.venue?.PlaceName}</td>

                          <td>
                            {item?.ageGroup?.map((age, ind) => {
                              return item.ageGroup[ind + 1] === undefined
                                ? `${age}`
                                : `${age} / `;
                            })}
                          </td>
                          <td className="d-flex justify-content-center gap-3 st">
                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "VIEW_EVENTS"
                            ) && (
                              <Button
                                variant="info"
                                size="md"
                                title="View Complete Details"
                                onClick={() => {
                                  setShowCompleteDetailsModal(true);
                                  setEvent(item);
                                }}
                              >
                                <BiSolidShow />
                              </Button>
                            )}

                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "UPDATE_EVENT"
                            ) && (
                              <Button
                                variant="warning"
                                size="md"
                                title="Edit Shop Details"
                                onClick={() =>
                                  navigate("/updateEvent", { state: item })
                                }
                              >
                                <FaEdit />
                              </Button>
                            )}
                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "DELETE_EVENT"
                            ) && (
                              <Button
                                variant="danger"
                                size="md"
                                title="Delete Shop"
                                onClick={() => handleDeleteShop(item._id)}
                              >
                                <MdDelete />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5">No Events Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
            {/* <EventPagination/> */}
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewEventDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            viewEvent={event}
          />
        )}
      </Container>
    </section>
  );
};

export default Events;
