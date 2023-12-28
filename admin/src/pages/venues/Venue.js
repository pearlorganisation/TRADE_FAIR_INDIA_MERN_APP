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
import ViewVenueDetails from "./ViewVenueDetails";
import style from "./Venue.module.css";
import { useDispatch, useSelector } from "react-redux";

import { GrFormAdd } from "react-icons/gr";
import { fetchShopsList } from "../../features/actions/shopActions";
import {
  deleteVenue,
  fetchVenuesList,
} from "../../features/actions/venueActions";
import { Controller } from "react-hook-form";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import { isUserHavePermission } from "../../utils";

// -------------------------------------------------------------------------------------------------

const Venue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statesList } = useSelector((state) => state.global);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [venueView, setVenueView] = useState({});
  const { loggedInUserData } = useSelector((state) => state.auth);

  const { venueList, isLoading, isvenueDeleted } = useSelector(
    (state) => state.venue
  );

  //This func is used for hover properties
  // const popoverBottom = (
  //   <Popover id="popover-positioned-bottom" title="Popover bottom">
  //     <strong>Holy guacamole!</strong> Check this info.
  //   </Popover>
  // );

  // This method is used to delete shop.
  const handleDeleteVenue = (venueId) => {
    confirmAlert({
      title: "Venue Delete Confirmation",
      message: "Are you sure you want to delete this venue?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteVenue({ venueId }));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  //Getting Full States Names
  const findStateNameBasedOnStateCode = (stateCode) => {
    if (Array.isArray(statesList) && statesList?.length > 0) {
      const state = statesList.find((state) =>
        state?.isoCode === stateCode ? state?.name : ""
      );
      return state?.name;
    }
  };

  useEffect(() => {
    if (isvenueDeleted) {
      dispatch(fetchVenuesList());
    }
  }, [isvenueDeleted]);

  //--------------------------------
  useEffect(() => {
    dispatch(fetchVenuesList());
  }, []);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Venue's Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(loggedInUserData?.role) && (
              <Button
                size="md"
                title="Create New Shop"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/createVenue");
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
                  <tr className="">
                    <th>S.No</th>
                    <th>Name of Place</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Location of Event</th>
                    <th>Description of Place</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={8} />
                  ) : Array.isArray(venueList) && venueList?.length > 0 ? (
                    venueList?.map((item, index) => {
                      return (
                        <tr style={{ verticalAlign: "middle" }}>
                          <td>{index + 1}</td>
                          <td>{item?.PlaceName}</td>
                          <td>
                            {" "}
                            {findStateNameBasedOnStateCode(item.State) || "N.A"}
                          </td>
                          <td>{item?.City}</td>
                          <td>{item?.Address?.slice(0, 20)}</td>
                          {/* <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="bottom"
                            overlay={
                              <Popover
                                id="popover-positioned-bottom"
                                title="Address"
                              >
                                <strong>{item?.Address}</strong>
                              </Popover>
                            }
                          >
                            <td>{item?.Address?.slice(0, 20)}</td>
                          </OverlayTrigger> */}
                          <td>
                            {/* <a
                              href={`${item.GeoLocation}`}
                              target="_blank"
                              alt="location"
                            > */}
                            {item?.GeoLocation?.loactionName?.slice(0, 23)}
                            {/* </a> */}
                          </td>
                          <td>{item?.PlaceDescription?.slice(0, 20)}</td>
                          {/* <OverlayTrigger
                            trigger={["hover", "focus"]}
                            placement="bottom"
                            overlay={
                              <Popover
                                id="popover-positioned-bottom"
                                title="Description"
                              >
                                <strong>{item?.PlaceDescription}</strong>
                              </Popover>
                            }
                          >
                            <td>{item?.PlaceDescription}</td>
                          </OverlayTrigger> */}
                          {/* <td>
                          {
                            item?.HotelNearby?.map(item => {
                              return <a href={`${item.link}`} target="_blank">
                              {item.link.slice(0, 23)}
                            </a>
                            })
                          }
                          
                        </td> */}

                          <td>
                            <div className="d-flex h-100 justify-content-center gap-3">
                              <Button
                                variant="info"
                                size="md"
                                title="View Complete Details"
                                onClick={() => {
                                  setVenueView(item);
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
                                  onClick={() =>
                                    navigate("/venue/updateVenue", {
                                      state: item,
                                    })
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
          <ViewVenueDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            viewData={venueView}
          />
        )}
      </Container>
    </section>
  );
};

export default Venue;
