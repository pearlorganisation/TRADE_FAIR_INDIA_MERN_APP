import React from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { useEffect } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import { Container, Row, Col, Button } from "react-bootstrap";
import { isUserHavePermission } from "../../../utils";
import ViewLoggedInUserDetails from "../../users/ViewLoggedInUserDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import TableSkeletonLoading from "../../../components/common/TableSkeletonLoading";
import { fetchEventBanner } from "../../../features/actions/eventBannerAction";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import EventBannerDetailsModal from "./EventBannerDetailsModal";
import { deleteBanner } from "../../../features/actions/eventBannerAction";

const FetchEventBanners = () => {
  // const isLoading=false
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUserData } = useSelector((state) => state.auth);
  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedBannerDetails, setSelectedBannerDetails] = useState({});

  const { isLoading, eventBannerList } = useSelector(
    (state) => state.eventBanner
  );

  // @@delete  banner function----------------------
  const handleDeleteBanner = (id) => {
    confirmAlert({
      title: "Event Banner Delete Confirmation",
      message: "Are you sure you want to delete this Event Banner?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteBanner(id)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  // @@END---------------------------------------------------

  useEffect(() => {
    dispatch(fetchEventBanner());
  }, []);
  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger"> Banner Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(loggedInUserData?.role) && (
              <Button
                size="md"
                title="Create New  Banner"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => navigate("/client/addEventBanner")}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </Col>
        </Row>
        <Table stripped bordered hover responsive className="text-center">
          <thead>
            <tr className="text-center">
              <th>S.No</th>
              <th>Event Banner Id</th>
              <th>Event banner</th>
              <th>Event Banner Data</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <TableSkeletonLoading thCount={7} />
            ) : Array.isArray(eventBannerList) && eventBannerList.length > 0 ? (
              eventBannerList?.map((eBanner, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{eBanner?._id}</td>
                    <td>
                      <img
                        className="w-25"
                        src={eBanner?.banner}
                        alt="banner"
                      ></img>
                    </td>
                    <td>{eBanner?.bannerData}</td>
                    <td>{eBanner?.active ? "True" : "False"}</td>

                    <Button
                      variant="info"
                      size="md"
                      title="View Complete Details"
                      onClick={() => {
                        setSelectedBannerDetails(eBanner);
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
                          title="Edit banner"
                          onClick={() =>
                            navigate(`/client/updateEventBanner`, {
                              state: eBanner,
                            })
                          }
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          title="Delete Banner"
                          onClick={() => handleDeleteBanner(eBanner?._id)}
                        >
                          {" "}
                          <MdDelete />
                        </Button>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <h5 className="mt-5 text-center">No Data found</h5>
            )}
          </tbody>
        </Table>
        {showCompleteDetailsModal && (
          <EventBannerDetailsModal
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            data={selectedBannerDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default FetchEventBanners;
