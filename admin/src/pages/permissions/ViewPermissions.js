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
import styles from "./Permission.module.css";
import ViewPermissionDetails from "./ViewPermissionDetails";
import {
  deletePermission,
  fetchPermissionsList,
} from "../../features/actions/permissionActions";
import moment from "moment";
import { isUserHavePermission } from "../../utils";

// ------------------------------------------------------------------------------------

const ViewPermissions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { permissionsList, isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state?.permission
  );

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedPermissionDetails, setSelectedPermissionDetails] = useState(
    {}
  );

  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete permission.
  const handleDeletePermission = (permissionId) => {
    confirmAlert({
      title: "Permission Delete Confirmation",
      message: "Are you sure you want to delete this permission?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deletePermission(permissionId)),
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
    dispatch(fetchPermissionsList());
  }, []);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Permission's Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(loggedInUserData?.role) && (
              <Button
                size="md"
                title="Create New Permission"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/addNewPermission");
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
                    <th>Permission's Id</th>
                    <th>Permission Name</th>
                    <th>Created At</th>
                    <th>Last Updated At</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={7} />
                  ) : Array.isArray(permissionsList) &&
                    permissionsList?.length > 0 ? (
                    permissionsList?.map((permission, i) => {
                      return (
                        <tr key={permission?._id || i}>
                          <td>{i + 1}</td>
                          <td>{permission?._id || "N.A"}</td>
                          <td className="text-primary">
                            <b>
                              {" "}
                              {permission?.permission
                                ?.toString()
                                ?.toUpperCase() || "N.A"}
                            </b>
                          </td>
                          <td>
                            {permission?.createdAt
                              ? moment(permission?.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {permission?.updatedAt
                              ? moment(permission?.updatedAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )
                              : "N.A"}
                          </td>
                          <td>
                            {permission?.createdBy?.name || "N.A"} -{" "}
                            {permission?.createdBy?.email || "N.A"}
                          </td>

                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            <Button
                              variant="info"
                              size="md"
                              title="View Complete Details"
                              onClick={() => {
                                setSelectedPermissionDetails(permission);
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
                                  title="Edit Permission"
                                  onClick={() =>
                                    navigate("/editPermission", {
                                      state: permission,
                                    })
                                  }
                                >
                                  <FaEdit />
                                </Button>

                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Permission"
                                  onClick={() =>
                                    handleDeletePermission(permission?._id)
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
                    <h5 className="mt-5 text-center">No Permission Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewPermissionDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            permissionData={selectedPermissionDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default ViewPermissions;
