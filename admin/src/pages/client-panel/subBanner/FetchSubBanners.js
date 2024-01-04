import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import {
  deleteSubBanner,
  fetchSubBanner,
} from "../../../features/actions/clientSubBanner";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TableSkeletonLoading from "../../../components/common/TableSkeletonLoading";
import { FaEdit } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { isUserHavePermission } from "../../../utils";
import SubBannerDetailsModal from "./SubBannerDetailsModal";

const FetchSubBanners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, clientSubBannerList } = useSelector(
    (state) => state?.clientSubBanner
  );

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedSubBannerDetails, setSelectedSubBannerDetails] = useState({});

  // @@delete sub banner function----------------------
  const handleDeleteSubBanner = (id) => {
    confirmAlert({
      title: "Role Delete Confirmation",
      message: "Are you sure you want to delete this role?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteSubBanner(id)),
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
    dispatch(fetchSubBanner());
  }, []);

  return (
    <section>
      <Container className="my-5">
        <Row className="mb-3">
          <Col xs="8" md="10">
            <h1 className="text-center text-danger">Sub banner Listing</h1>
          </Col>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(loggedInUserData?.role) && (
              <Button
                size="md"
                title="Create New Sub Banner"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/client/addSubBanner");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </Col>
        </Row>
        <Table striped bordered hover responsive className="text-center">
          <thead>
            <tr className="text-center">
              <th>S.NO</th>
              <th>Sub banner id</th>
              <th>Banner</th>
              <th>Banner data</th>
              <th>Button Link</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <TableSkeletonLoading thCount={7} />
            ) : Array.isArray(clientSubBannerList) &&
              clientSubBannerList?.length > 0 ? (
              clientSubBannerList?.map((res, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{res?._id}</td>
                    <td>
                      <img
                        className="w-25"
                        src={res?.banner}
                        alt="sub-banner"
                      ></img>
                    </td>
                    <td>{res?.bannerData}</td>
                    <td>{res?.buttonLink}</td>

                  <td>
                    <div className="d-flex h-100 justify-content-center gap-3">
                     <Button
                      variant="info"
                      size="md"
                      title="View Complete Details"
                      onClick={() => {
                        setSelectedSubBannerDetails(res);
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
                          title="Edit sub banner"
                          onClick={() =>
                            navigate(`/client/updateSubBanner/${res?._id}`, {
                              state: res,
                            })
                          }
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          title="Delete sub banner"
                          onClick={() => handleDeleteSubBanner(res?._id)}
                        >
                          {" "}
                          <MdDelete />
                        </Button>
                      </>
                    )}
                    
                    </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h5 className="mt-5 text-center">No Data found</h5>
            )}
          </tbody>
        </Table>

        {showCompleteDetailsModal && (
          <SubBannerDetailsModal
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            data={selectedSubBannerDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default FetchSubBanners;
