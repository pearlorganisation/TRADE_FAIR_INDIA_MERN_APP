import React, { useEffect, useState } from "react";
import styles from "./Organiser.module.css";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import ViewOrganiserDetails from "./ViewOrganiserDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrganiser,
  fetchOrganiserList,
} from "../../features/actions/organiserActions";
import Loader from "../../components/common/Loader";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import { isUserHavePermission } from "../../utils";

const ViewOrganiser = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { statesList } = useSelector((state) => state.global);
  const [organiserData, setOrganiserData] = useState({});
  //THis is to create buttons dynamic as per the user role
  const { loggedInUserData } = useSelector((state) => state.auth);

  const { isLoading, isSuccess, errorMessage, organiserList } = useSelector(
    (state) => state?.organiser
  );

  const handleDelete = (organiserId) => {
    confirmAlert({
      title: "Organiser Delete Confirmation",
      message: "Are you sure you want to delete this organiser?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteOrganiser({ organiserId })),
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
    dispatch(fetchOrganiserList());
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row mb-3">
          <div className="col-md-10 col-8">
            <div>
              <h1
                className="text-danger text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                Organiser's Listing
              </h1>
            </div>
          </div>
          <div className="col-md-2 col-4 d-flex justify-content-end align-items-center">
            {isUserHavePermission(
              loggedInUserData?.role,
              loggedInUserData?.permissions,
              "CREATE_ORGANISER"
            ) && (
              <div>
                <Link to={"/addOrganiser"} className="btn btn-info btn-sm ">
                  <AiOutlineFileAdd size={25} />
                </Link>
              </div>
            )}
          </div>
          {/* <div className="col-md-12">
            <p className="text-info fs-6 text-end  mb-0">
              Click on view icon to see complete details
            </p>
          </div> */}
        </div>
        <div className="row">
          <div className="events_table">
            {/* {isLoading && organiserList?.length === 0 && (
                <section>
                  <Loader />
                </section>
              )} */}
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover text-center ">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <TableSkeletonLoading thCount={8} />
                  ) : Array.isArray(organiserList) &&
                    organiserList?.length > 0 ? (
                    organiserList?.map((item, i) => {
                      return (
                        <tr key={item?._id || i}>
                          <th scope="row">{i + 1}</th>
                          <td>{item.companyName}</td>
                          <td>{item.email}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.address}</td>
                          <td>
                            {item?.city === "undefined" ? "NA" : item.city}
                          </td>
                          <td>
                            {findStateNameBasedOnStateCode(item.state) || "N.A"}
                          </td>
                          <td className="d-flex gap-3  justify-content-center align-items-center">
                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "VIEW_ORGANISERS"
                            ) && (
                              <Link
                                className="btn btn-info"
                                title="View Content"
                                onClick={() => {
                                  handleShow();
                                  setOrganiserData(item);
                                }}
                              >
                                <BiSolidShow />
                              </Link>
                            )}

                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "UPDATE_ORGANISER"
                            ) && (
                              <div
                                // to={"/editOrganiserDetails"}
                                onClick={() =>
                                  navigate("/editOrganiserDetails", {
                                    state: item,
                                  })
                                }
                                className="btn btn-warning"
                                title="Edit Content"
                              >
                                <FaEdit />
                              </div>
                            )}
                            {isUserHavePermission(
                              loggedInUserData?.role,
                              loggedInUserData?.permissions,
                              "DELETE_ORGANISER"
                            ) && (
                              <button
                                onClick={() => handleDelete(item?._id)}
                                className="btn btn-danger"
                                title="Delete Content"
                              >
                                <MdDelete />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5>No Data found</h5>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <ViewOrganiserDetails
            show={show}
            handleClose={handleClose}
            organiserData={organiserData}
          />
        </div>
      </div>
    </>
  );
};

export default ViewOrganiser;
