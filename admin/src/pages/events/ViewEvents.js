import React, { useState } from "react";
import style from "./Events.module.css";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import EventDetails from "./EventsDetails";

const ViewEvents = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            toast.success("Events deleted successfully", {
              position: "top-right",
            }),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className={style.table_heading}>
              <h1>Event's Listing</h1>
              <div>
                {isUserHavePermission(
                  loggedInUserData?.role,
                  loggedInUserData?.permissions,
                  "CREATE_EVENT"
                ) && (
                  <Link to={"/addEvents"} className="btn btn-info btn-sm ">
                    <AiOutlineFileAdd size={25} />
                  </Link>
                )}
              </div>
            </div>
            <div className="events_table">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover text-center ">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td className="d-flex gap-3  justify-content-center align-items-center">
                        <Link
                          className="btn btn-info btn-sm"
                          title="View Content"
                          onClick={handleShow}
                        >
                          <BiSolidShow />
                        </Link>
                        <Link
                          to={"/editEventDeatils"}
                          className="btn btn-warning btn-sm"
                          title="Edit Content"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger btn-sm"
                          title="Delete Content"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td className="d-flex gap-3  justify-content-center align-items-center">
                        <Link
                          className="btn btn-info btn-sm"
                          title="View Content"
                          onClick={handleShow}
                        >
                          <BiSolidShow />
                        </Link>
                        <Link
                          to={"/editEventDeatils"}
                          className="btn btn-warning btn-sm"
                          title="Edit Content"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger btn-sm"
                          title="Delete Content"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td className="d-flex gap-3  justify-content-center align-items-center">
                        <Link
                          className="btn btn-info btn-sm"
                          title="View Content"
                          onClick={handleShow}
                        >
                          <BiSolidShow />
                        </Link>
                        <Link
                          to={"/editEventDeatils"}
                          className="btn btn-warning btn-sm"
                          title="Edit Content"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={handleDelete}
                          className="btn btn-danger btn-sm"
                          title="Delete Content"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <EventDetails show={show} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEvents;
