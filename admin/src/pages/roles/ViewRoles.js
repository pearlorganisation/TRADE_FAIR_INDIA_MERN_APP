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
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import styles from "./Role.module.css";
import ViewRoleDetails from "./ViewRoleDetails";
import { deleteRole, fetchRolesList } from "../../features/actions/roleActions";
import moment from "moment";
import { isUserHavePermission } from "../../utils";

// ------------------------------------------------------------------------------------

const ViewRoles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rolesList, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state?.role
  );

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedRoleDetails, setSelectedRoleDetails] = useState({});

  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete role.
  const handleDeleteRole = (roleId) => {
    confirmAlert({
      title: "Role Delete Confirmation",
      message: "Are you sure you want to delete this role?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteRole(roleId)),
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
    dispatch(fetchRolesList());
  }, []);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Role's Listing</h1>
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
                  navigate("/addNewRole");
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
                    <th>Role's Id</th>
                    <th>Role Name</th>
                    <th>Created At</th>
                    <th>Last Updated At</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={7} />
                  ) : Array.isArray(rolesList) && rolesList?.length > 0 ? (
                    rolesList?.map((role, i) => {
                      return (
                        <tr key={role?._id || i}>
                          <td>{i + 1}</td>
                          <td>{role?._id || "N.A"}</td>
                          <td
                            className={
                              role?.role?.toString()?.toUpperCase() === "ADMIN"
                                ? "text-success"
                                : role?.role?.toString()?.toUpperCase() ===
                                  "VENDOR"
                                ? "text-danger"
                                : "text-primary"
                            }
                          >
                            <b>
                              {role?.role?.toString()?.toUpperCase() ===
                              "SUPER_ADMIN"
                                ? `${role?.role
                                    ?.toString()
                                    ?.toUpperCase()} (OWNER)`
                                : role?.role?.toString()?.toUpperCase() ||
                                  "N.A"}
                            </b>
                          </td>
                          <td>
                            {role?.createdAt
                              ? moment(role?.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {role?.updatedAt
                              ? moment(role?.updatedAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {role?.createdBy?.name || "N.A"} -{" "}
                            {role?.createdBy?.email || "N.A"}
                          </td>
                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            <Button
                              variant="info"
                              size="md"
                              title="View Complete Details"
                              onClick={() => {
                                setSelectedRoleDetails(role);
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
                                    navigate("/editRole", {
                                      state: role,
                                    })
                                  }
                                >
                                  <FaEdit />
                                </Button>

                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Role"
                                  onClick={() => handleDeleteRole(role?._id)}
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
                    <h5 className="mt-5 text-center">No Role Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewRoleDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            roleData={selectedRoleDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default ViewRoles;
