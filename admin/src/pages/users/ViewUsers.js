import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteUser,
  fetchUsersList,
  manageUserActivationDeactivation,
} from "../../features/actions/userActions";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import styles from "./User.module.css";
import ViewUserDetails from "./ViewUserDetails";
import moment from "moment";
import { isUserHavePermission } from "../../utils";
import Searching from "../../components/Searching";
import Pagination from "../../components/Pagination";

// ------------------------------------------------------------------------------------

const ViewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    usersList,
    isLoading,
    isSuccess,
    errorMessage,
    isUserStatusUpdated,
    totalPages,
  } = useSelector((state) => state?.user);
  let [searchParams, setSearchParams] = useSearchParams();

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedUserDetails, setSelectedUserDetails] = useState({});

  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete user.
  const handleDeleteUser = (userId) => {
    confirmAlert({
      title: "User Delete Confirmation",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteUser(userId));
          },
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
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    dispatch(fetchUsersList({ search, page }));
  }, [isUserStatusUpdated, searchParams]);

  return (
    <section>
      <Container className="my-5 px-20 px-md-5">
        <div className="mb-3 d-flex flex-row justify-content-between align-items-center container-fluid p-5 ">
          <div>
            <h1 className="text-center text-danger">User's Listing</h1>
          </div>
          <div>
            <Searching />
          </div>
          <div>
            {isUserHavePermission(
              loggedInUserData?.role,
              loggedInUserData?.permissions,
              "CREATE_USER"
            ) && (
              <Button
                size="md"
                title="Create New User"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/addNewUser");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </div>
        </div>

        <Row>
          <Col>
            <Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th>User's Id</th>
                    <th>Full Name</th>
                    <th>Email Address (Username)</th>
                    <th>Assigned Role</th>
                    <th>Created At</th>
                    <th>Last Updated At</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={7} />
                  ) : Array.isArray(usersList) && usersList?.length > 0 ? (
                    usersList?.map((user, i) => {
                      return (
                        <tr key={user?._id || i}>
                          <td>{i + 1}</td>
                          <td>{user?._id || "N.A"}</td>
                          <td>{user?.name || "N.A"}</td>
                          <td>{user?.email || "N.A"}</td>
                          <td
                            className={
                              user?.role?.role?.toString()?.toUpperCase() ===
                              "ADMIN"
                                ? "text-success"
                                : user?.role?.role
                                    ?.toString()
                                    ?.toUpperCase() === "VENDOR"
                                ? "text-danger"
                                : "text-primary"
                            }
                          >
                            <b>
                              {user?.role?.role?.toString()?.toUpperCase() ===
                              "SUPER_ADMIN"
                                ? `${user?.role?.role
                                    ?.toString()
                                    ?.toUpperCase()} (OWNER)`
                                : user?.role?.role?.toString()?.toUpperCase() ||
                                  "N.A"}
                            </b>
                          </td>
                          <td>
                            {user?.createdAt
                              ? moment(user?.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {user?.updatedAt
                              ? moment(user?.updatedAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {user?.createdBy?.name || "N.A"} -{" "}
                            {user?.createdBy?.email || "N.A"}
                          </td>
                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            <Button
                              variant="info"
                              size="md"
                              title="View Complete Details"
                              onClick={() => {
                                setSelectedUserDetails(user);
                                setShowCompleteDetailsModal(true);
                              }}
                            >
                              <BiSolidShow />
                            </Button>

                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "UPDATE_USER"
                            ) && (
                              <>
                                <Button
                                  variant="warning"
                                  size="md"
                                  title="Edit User Details"
                                  onClick={() =>
                                    navigate("/editUserDetails", {
                                      state: user,
                                    })
                                  }
                                >
                                  <FaEdit />
                                </Button>

                                {isUserHavePermission(
                                  loggedInUserData?.role,
                                  loggedInUserData?.permissions,
                                  "DELETE_USER"
                                ) && (
                                  <Button
                                    variant="danger"
                                    size="md"
                                    title="Delete User"
                                    onClick={() => handleDeleteUser(user?._id)}
                                    disabled={
                                      user?.role?.role === "SUPER_ADMIN"
                                    }
                                  >
                                    <MdDelete />
                                  </Button>
                                )}

                                {(loggedInUserData?.role === "SUPER_ADMIN" ||
                                  loggedInUserData?.role === "ADMIN") && (
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Activate User"
                                    style={{ cursor: "pointer" }}
                                    checked={
                                      user?.isUserActivate
                                        ?.toString()
                                        ?.toLowerCase() === "activate"
                                        ? true
                                        : false
                                    }
                                    onClick={() =>
                                      dispatch(
                                        manageUserActivationDeactivation({
                                          userId: user?._id,
                                          status:
                                            user?.isUserActivate
                                              ?.toString()
                                              ?.toLowerCase() === "activate"
                                              ? false
                                              : true,
                                        })
                                      )
                                    }
                                  />
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5 text-center">No User Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewUserDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            userData={selectedUserDetails}
          />
        )}
      </Container>
      <Pagination totalPages={totalPages} />
    </section>
  );
};

export default ViewUsers;
