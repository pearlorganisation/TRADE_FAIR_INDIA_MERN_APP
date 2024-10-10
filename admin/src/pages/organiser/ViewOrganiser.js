import React, { useEffect, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { Button, FormControl, InputGroup, Row, Col, Card } from "react-bootstrap";
import Pagination  from "../../components/Pagination";
import Searching from "../../components/Searching";

const ViewOrganiser = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { statesList } = useSelector((state) => state.global);
  const [organiserData, setOrganiserData] = useState({});
  const { loggedInUserData } = useSelector((state) => state.auth);

  const { isLoading, organiserList } = useSelector((state) => state?.organiser);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(searchParams.get("page")) || 1;
  });
  const [search, setSearch] = useState(() => {
    return searchParams.get("query") || "";
  });

  const RowOnPage = 4;

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const findStateNameBasedOnStateCode = (stateCode) => {
    if (Array.isArray(statesList) && statesList?.length > 0) {
      const state = statesList.find(
        (state) => state?.isoCode === stateCode ? state?.name : ""
      );
      return state?.name;
    }
  };

  useEffect(() => {
    dispatch(fetchOrganiserList());
  }, [dispatch]);

  return (
    <>
      <div className="container my-5 ">
        {/* Header Section */}
        <div className="mb-3 d-flex flex-row justify-content-between align-items-center container-fluid p-3 row ">
          <div className="col-sm-4">
            <h1 className="text-danger text-center text-md-start">
              Organiser's Listing
            </h1>
          </div>
          
       
             <div className="col-sm-4">
              <Searching />
             </div>
             <div className="col-sm-4 d-flex justify-content-center">            {isUserHavePermission(
              loggedInUserData?.role,
              loggedInUserData?.permissions,
              "CREATE_ORGANISER"
            ) && (
              <Button
                size="md"
                title="Create New Shop"
                variant="info"
                className=""
                onClick={() => {
                  navigate("/addOrganiser");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </div>
    </div>
        

        {/* Table Layout for Medium and Larger Screens */}
        <div className="d-none d-md-block">
        <table className="table table-bordered table-striped table-hover text-center my-3">
        <thead className="table-light">
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
                <TableSkeletonLoading thCount={4} />
              ) : Array.isArray(organiserList) && organiserList?.length > 0 ? (
                organiserList?.map((item, i) => (
                  <tr key={item?._id || i}>
                    <th scope="row">{i + 1}</th>
                    <td>{item.companyName}</td>
                    <td className="text-break">{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td class="text-wrap col-12 col-md-6 col-lg-4 col-xl-3">{item.address}</td>
                    <td>
                      {item.city === "undefined" ? "N.A." : item.city}
                    </td>
                    <td>
                      {findStateNameBasedOnStateCode(item.state) || "N.A."}
                    </td>
                    <td>
                      <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                        {isUserHavePermission(
                          loggedInUserData?.role,
                          loggedInUserData?.permissions,
                          "VIEW_ORGANISERS"
                        ) && (
                          <Button
                            variant="info"
                            size="sm"
                            title="View Content"
                            onClick={() => {
                              handleShow();
                              setOrganiserData(item);
                            }}
                          >
                            <BiSolidShow />
                          </Button>
                        )}
                        {isUserHavePermission(
                          loggedInUserData?.role,
                          loggedInUserData?.permissions,
                          "UPDATE_ORGANISER"
                        ) && (
                          <Button
                            variant="warning"
                            size="sm"
                            title="Edit Content"
                            onClick={() =>
                              navigate("/editOrganiserDetails", {
                                state: item,
                              })
                            }
                          >
                            <FaEdit />
                          </Button>
                        )}
                        {isUserHavePermission(
                          loggedInUserData?.role,
                          loggedInUserData?.permissions,
                          "DELETE_ORGANISER"
                        ) && (
                          <Button
                            variant="danger"
                            size="sm"
                            title="Delete Content"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <MdDelete />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card Layout for Small Screens */}
        <div className="d-block d-md-none">
          {isLoading ? (
            <TableSkeletonLoading thCount={1} />
          ) : Array.isArray(organiserList) && organiserList?.length > 0 ? (
            organiserList?.map((item, i) => (
              <Card key={item?._id || i} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    {i + 1}. {item.companyName}
                  </Card.Title>
                  <Card.Text>
                    <strong>Email:</strong>{" "}
                    <span className="text-break">
                      {item.email || "N.A."}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone No.:</strong> {item.phoneNumber || "N.A."}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address:</strong>{" "}
                    <span className="text-break">
                      {item.address || "N.A."}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong>City:</strong>{" "}
                    {item.city === "undefined" ? "N.A." : item.city}
                  </Card.Text>
                  <Card.Text>
                    <strong>State:</strong>{" "}
                    {findStateNameBasedOnStateCode(item.state) || "N.A."}
                  </Card.Text>
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    {isUserHavePermission(
                      loggedInUserData?.role,
                      loggedInUserData?.permissions,
                      "VIEW_ORGANISERS"
                    ) && (
                      <Button
                        variant="info"
                        size="sm"
                        title="View Content"
                        onClick={() => {
                          handleShow();
                          setOrganiserData(item);
                        }}
                      >
                        <BiSolidShow />
                      </Button>
                    )}
                    {isUserHavePermission(
                      loggedInUserData?.role,
                      loggedInUserData?.permissions,
                      "UPDATE_ORGANISER"
                    ) && (
                      <Button
                        variant="warning"
                        size="sm"
                        title="Edit Content"
                        onClick={() =>
                          navigate("/editOrganiserDetails", {
                            state: item,
                          })
                        }
                      >
                        <FaEdit />
                      </Button>
                    )}
                    {isUserHavePermission(
                      loggedInUserData?.role,
                      loggedInUserData?.permissions,
                      "DELETE_ORGANISER"
                    ) && (
                      <Button
                        variant="danger"
                        size="sm"
                        title="Delete Content"
                        onClick={() => handleDelete(item?._id)}
                      >
                        <MdDelete />
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-center py-4">No Data Found</div>
          )}
        </div>

        {/* Modal for Viewing Organiser Details */}
        <ViewOrganiserDetails
          show={show}
          handleClose={handleClose}
          organiserData={organiserData}
        /> 
<div class="container-fluid row" style={{ paddingBottom: "100px"}}>
<div class="container mt-5 ">
  <Pagination />
</div>

</div>


      </div>
    </>
  );
};

export default ViewOrganiser;
