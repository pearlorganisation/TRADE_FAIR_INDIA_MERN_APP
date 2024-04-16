import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ViewShopDetails from "./ViewShopDetails";
import { useDispatch, useSelector } from "react-redux";
import { deleteShop, fetchShopsList } from "../../features/actions/shopActions";
import styles from "./Shops.module.css";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import moment from "moment";
import { availablePermissions, isUserHavePermission } from "../../utils";
// -------------------------------------------------------------------------------------------------
const ViewShops = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, errorMessage, shopsList } = useSelector(
    (state) => state.shop
  );
  const { loggedInUserData } = useSelector((state) => state.auth);
  const { statesList } = useSelector((state) => state.global);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedShopDetails, setSelectedShopDetails] = useState({});

  // This method is used to find State Name based on state iso code.
  const findStateNameBasedOnStateCode = (stateCode) => {
    if (Array.isArray(statesList) && statesList?.length > 0) {
      const state = statesList.find((state) =>
        state?.isoCode === stateCode ? state?.name : ""
      );
      return state?.name || "N.A";
    }
  };

  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete shop.
  const handleDeleteShop = (shopId) => {
    confirmAlert({
      title: "Shop Delete Confirmation",
      message: "Are you sure you want to delete this shop?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteShop(shopId)),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  //Calling Fetch Shops List API
  useEffect(() => {
    dispatch(fetchShopsList());
  }, []);

  useEffect(() => {
    console.log(availablePermissions);
    console.log(loggedInUserData?.permissions);
    console.log(loggedInUserData?.permissions.includes("DELETE_SHOP"));
  }, []);

  // -------------------------------------------------------------------------------------------------------------

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Shop's Listing</h1>
          </Col>

          {isUserHavePermission(
            loggedInUserData?.role,
            loggedInUserData?.permissions,
            "CREATE_SHOP"
          ) && (
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
                  navigate("/addNewShop");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            </Col>
          )}
        </Row>

        <Row className={styles.shops_listing_custom_height}>
          <Col>
            <Col>
              <Col style={{ textAlign: "right" }} className="text-info fs-6">
                Click on view icon to see complete details
              </Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th>Shop Id</th>
                    <th>Shop Name</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Date of Registration</th>
                    <th>Created At</th>
                    <th>Last Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={9} />
                  ) : Array.isArray(shopsList) && shopsList?.length > 0 ? (
                    shopsList?.map((shop, i) => {
                      return (
                        <tr key={shop?._id || i}>
                          <td>{i + 1}</td>
                          <td>{shop?._id || "N.A"}</td>
                          <td>{shop?.shopName || "N.A"}</td>
                          <td>
                            {findStateNameBasedOnStateCode(shop?.state) ||
                              "N.A"}
                          </td>
                          <td>{shop?.city || "N.A"}</td>
                          <td>{shop?.registrationDate || "N.A"}</td>
                          <td>
                            {/* {shop?.createdAt
                              ? moment(shop?.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"} */}
                            {shop?.createdBy?.name || "N.A"}
                          </td>
                          <td>
                            {shop?.updatedAt
                              ? moment(shop?.updatedAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "VIEW_SHOPS"
                            ) && (
                              <Button
                                variant="info"
                                size="md"
                                title="View Complete Details"
                                onClick={() => {
                                  setSelectedShopDetails(shop);
                                  setShowCompleteDetailsModal(true);
                                }}
                              >
                                <BiSolidShow />
                              </Button>
                            )}

                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "UPDATE_SHOP"
                            ) && (
                              <>
                                <Button
                                  variant="warning"
                                  size="md"
                                  title="Edit Shop Details"
                                  onClick={() =>
                                    navigate("/editShopDetails", {
                                      state: shop,
                                    })
                                  }
                                >
                                  <FaEdit />
                                </Button>
                              </>
                            )}

                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "DELETE_SHOP"
                            ) && (
                              <Button
                                variant="danger"
                                size="md"
                                title="Delete Shop"
                                onClick={() => handleDeleteShop(shop?._id)}
                              >
                                <MdDelete />
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5 text-center">No Shop Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewShopDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            shopData={selectedShopDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default ViewShops;

// ------------------------------------------- THE END -------------------------------------------
