import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../shops/Shops.module.css";
import qs from "qs";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  emailRegex,
  indianMobileRegex,
  nameRegex,
  websiteRegex,
} from "../../utils/regexes";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { City } from "country-state-city";
import moment from "moment";
import Card from "react-bootstrap/Card";
import {
  addNewCategory,
  fetchCategoriesList,
  updateCategoryDetails,
} from "../../features/actions/categoryActions";
import MultipleImagesUpload from "../../components/common/MultipleImagesUpload";
import { fetchEventList } from "../../features/actions/eventAction";
import { MdClear } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import customStyles from "./Category.module.css";
// ----------------------------------------------------------------------------------------------
const AddCategory = () => {
  const [count, setCount] = useState(1);
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
    resetField,
  } = useForm({
    defaultValues: {
      Category: state?.shop?.category,
      productCategories: state?.shop?.productCategories,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productCategories",
  });
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryIndividualList } = useSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryIndividualList.status === "SUCCESS") {
      navigate("/category");
    }
  }, [categoryIndividualList]);

  // This method is used to submit new category  form data.
  const onSubmit = (formData) => {
    let newData = {
      category: formData.Category,
      productCategories: formData.productCategories,
    };
    dispatch(updateCategoryDetails({ newData, id: state?.shop?._id }));
  };

  // -------------------------------------------------------------------------------------------------------------------------------------

  return (
    <section>
      <Container className="">
        <Row>
          <Col className="p-0">
            <h2
              className={`text-center text-danger mb-3 my-2 py-2 ${styles.addShopTitle}`}
            >
              Update Category
            </h2>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 border border-2 rounded-2"
        >
          <Row className="">
            <Col sm={12} md={6} className="mx-auto">
              <Form.Group className="my-3" controlId="shopName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category Name"
                  {...register("Category", {
                    required: {
                      value: true,
                      message: "Category Name is required",
                    },
                    pattern: {
                      value: nameRegex,
                      message: "Category Name is invalid",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "Category Name cannot be less than 5 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Category Name cannot be more than 50 characters.",
                    },
                  })}
                />
                <span className="fw-normal fs-6 text-danger">
                  {errors?.Category?.message}
                </span>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} md={6} className="mx-auto">
              <Form.Group className="my-3" controlId="shopName">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Form.Label>Product Category Name</Form.Label>
                  <button
                    type="button"
                    className="btn btn-info my-2"
                    onClick={() => append({ productCategory: "" })}
                  >
                    <GrAdd />
                  </button>
                </div>
                <ul className={customStyles.update_list}>
                  {fields.map((item, index) => (
                    <li key={item.id} className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Enter Product Category Name"
                        {...register(
                          `productCategories.${index}.productCategory`
                        )}
                      />

                      {fields.length > 1 && (
                        <button
                          className="btn btn-info ms-2"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <MdDelete />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <span className="fw-normal fs-6 text-danger">
                  {errors?.productCategories && "This Field is required"}
                </span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="my-3 text-center">
              <Button className="btn btn-md" variant="info" type="submit">
                Update Category
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default AddCategory;

// ------------------------------------------- THE END -------------------------------------------
