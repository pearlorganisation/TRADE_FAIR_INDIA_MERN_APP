import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import HomeBannerDetailsModal from "./HomeBannerDetailsModal";
import { BiSolidShow } from "react-icons/bi";
import {
  deleteBanner,
  fetchBanner,
  updateBanner,
} from "../../../features/actions/clientHomeBanner";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import TableSkeletonLoading from "../../../components/common/TableSkeletonLoading";
import { FaEdit } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import { isUserHavePermission } from "../../../utils";
// import HomeBannerDetailsModal
const FetchBanners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientBannerList, isLoading } = useSelector(
    (state) => state?.clientBanner
  );

  const { loggedInUserData } = useSelector((state) => state.auth);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedBannerDetails, setSelectedBannerDetails] = useState({});

  // @@delete  banner function----------------------
  const handleDeleteBanner = (id) => {
    confirmAlert({
      title: "Banner Delete Confirmation",
      message: "Are you sure you want to delete this Banner?",
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
    dispatch(fetchBanner());
  }, []);

  return (
    <section>
      <Container className="my-5" style={{ overflowY: "auto" }}>
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
                onClick={() => {
                  navigate("/client/addHomeBanner");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr className="text-center">
                  <th>S.NO</th>
                  <th>banner id</th>
                  <th>Banner</th>
                  <th>Banner data</th>
                  <th>Button Link</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {isLoading ? (
                  <TableSkeletonLoading thCount={7} />
                ) : Array.isArray(clientBannerList) &&
                  clientBannerList?.length > 0 ? (
                  clientBannerList?.map((res, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{res?._id}</td>
                        <td>
                          <img
                            className="w-25"
                            src={res?.banner}
                            alt="banner"
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
                                setSelectedBannerDetails(res);
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
                                    navigate(
                                      `/client/updateBanner/${res?._id}`,
                                      {
                                        state: res,
                                      }
                                    )
                                  }
                                >
                                  <FaEdit />
                                </Button>

                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Banner"
                                  onClick={() => handleDeleteBanner(res?._id)}
                                >
                                  {" "}
                                  <MdDelete />
                                </Button>
                                <div class="form-check">
                                  <input
                                    onChange={(e) => {
                                      console.log(e.target.checked);
                                      dispatch(
                                        updateBanner({
                                          id: res?._id,
                                          payload: { active: e.target.checked },
                                        })
                                      );
                                    }}
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={res?.active}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Active Banner
                                  </label>
                                </div>
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
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <HomeBannerDetailsModal
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            data={selectedBannerDetails}
          />
        )}
      </Container>
    </section>
  );
};

export default FetchBanners;
