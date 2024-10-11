import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
// import ViewShopDetails from "./ViewShopDetails";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteShop, fetchShopsList } from "../../features/actions/shopActions";
import ViewShopDetails from "../shops/ViewShopDetails";
import {
  deleteCategory,
  fetchCategoriesList,
} from "../../features/actions/categoryActions";
import ViewCategoryDetails from "./ViewCategory";
import TableSkeletonLoading from "../../components/common/TableSkeletonLoading";
import styles from "./Category.module.css";
import { isUserHavePermission } from "../../utils";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Pagination from "../../components/Pagination";
import Searching from "../../components/Searching";

// -------------------------------------------------------------------------------------------------
const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //THis is to create buttons dynamic as per the user role
  const { loggedInUserData } = useSelector((state) => state.auth);

  const { isLoading, isSuccess, errorMessage, shopsList } = useSelector(
    (state) => state.shop
  );
  const { isDeleted } = useSelector((state) => state.category);
  const { categoriesList, totalPages } = useSelector((state) => state.category);

  const [showCompleteDetailsModal, setShowCompleteDetailsModal] =
    useState(false);

  const [selectedShopDetails, setSelectedShopDetails] = useState({});

  // const currentCat = categoriesList.slice(FirstPage, LastPage);
  // -------------------------------------------------------------------------------------------------------------
  // This method is used to delete shop.
  const handleDeleteShop = (shopId) => {
    confirmAlert({
      title: "Category Delete Confirmation",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteCategory(shopId)),
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
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    dispatch(fetchShopsList());
    dispatch(fetchCategoriesList({ page, search }));
  }, [isDeleted, searchParams]);

  const customActionsStyle = {
    // position: "absolute",
    // top: "50%",
    // transform: "translate(45%,-50%)",
    // left:"10px"
  };

  // -------------------------------------------------------------------------------------------------------------

  return (
    <section>
      <Container className="my-5">
        <div className="mb-3 d-flex flex-row justify-content-between align-items-center">
          <div>
            {" "}
            <h1 className="text-danger"> Category's Listing </h1>
          </div>

          <div className="mx-3">
            {" "}
            {/* Use mx-3 for horizontal margin */}
            <Searching />
          </div>
          <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
          >
            {isUserHavePermission(
              loggedInUserData?.role,
              loggedInUserData?.permissions,
              "CREATE_CATEGORY"
            ) && (
              <Button
                size="md"
                title="Create New Shop"
                variant="info"
                className="d-flex align-items-center"
                onClick={() => {
                  navigate("/addCategoryDetails");
                }}
              >
                <AiOutlineFileAdd size={25} />
              </Button>
            )}
          </Col>
        </div>

        <Row>
          <Col>
            <Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr className="text-center">
                    <th>S.No</th>
                    <th>Category Id</th>
                    <th>Category</th>
                    <th>Product Categories</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {isLoading ? (
                    <TableSkeletonLoading thCount={5} />
                  ) : Array.isArray(categoriesList) &&
                    categoriesList?.length > 0 ? (
                    categoriesList?.map((shop, i) => {
                      return (
                        <tr
                          key={shop?._id || i}
                          style={{ verticalAlign: "middle" }}
                        >
                          <td>{i + 1}</td>
                          <td>{shop?._id || "N.A"}</td>
                          <td>{shop?.category || "N.A"}</td>
                          <td style={{ width: "25%" }}>
                            <ol className={`mb-0 ${styles.custom_ol} `}>
                              {shop.productCategories.map((el, i) => (
                                <li key={i} className="mb-0">
                                  ◆ {el.productCategory} &nbsp;
                                </li>
                              ))}
                            </ol>
                          </td>
                          <td
                            // className="d-flex justify-content-center align-items-center gap-1"
                            style={{
                              position: "relative",
                              height: "100%",
                              width: "200px",
                            }}
                          >
                            <div style={customActionsStyle}>
                              {" "}
                              {isUserHavePermission(
                                loggedInUserData?.role,
                                loggedInUserData?.permissions,
                                "VIEW_CATEGORIES"
                              ) && (
                                <Button
                                  variant="info"
                                  size="md"
                                  title="View Complete Details"
                                  onClick={() => {
                                    setSelectedShopDetails(shop);
                                    setShowCompleteDetailsModal(true);
                                  }}
                                  className="me-2"
                                >
                                  <BiSolidShow />
                                </Button>
                              )}
                              {isUserHavePermission(
                                loggedInUserData?.role,
                                loggedInUserData?.permissions,
                                "UPDATE_CATEGORY"
                              ) && (
                                <Button
                                  variant="warning"
                                  size="md"
                                  title="Edit Shop Details"
                                  className="me-2"
                                  onClick={() =>
                                    navigate("/editCategoryDetails", {
                                      state: {
                                        shop: shop,
                                      },
                                    })
                                  }
                                >
                                  <FaEdit />
                                </Button>
                              )}
                              {isUserHavePermission(
                                loggedInUserData?.role,
                                loggedInUserData?.permissions,
                                "DELETE_CATEGORY"
                              ) && (
                                <Button
                                  variant="danger"
                                  size="md"
                                  title="Delete Shop"
                                  onClick={() => handleDeleteShop(shop?._id)}
                                  className="me-2"
                                >
                                  <MdDelete />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <h5 className="mt-5 text-center">No Category Found</h5>
                  )}
                </tbody>
              </Table>
            </Col>
          </Col>
        </Row>
        {showCompleteDetailsModal && (
          <ViewCategoryDetails
            show={showCompleteDetailsModal}
            hide={() => setShowCompleteDetailsModal(false)}
            shopData={selectedShopDetails}
          />
        )}
      </Container>

      <Pagination totalPages={totalPages} />
      {/* <div className="container-fluid p-10">
      <Pagination/></div> */}
    </section>
  );
};

export default Category;

// ------------------------------------------- THE END -------------------------------------------
