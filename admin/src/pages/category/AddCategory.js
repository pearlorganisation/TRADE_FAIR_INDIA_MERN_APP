import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../shops/Shops.module.css";
import qs from "qs";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  customFieldregex,
  emailRegex,
  indianMobileRegex,
  nameRegex,
  websiteRegex,
} from "../../utils/regexes";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { City } from "country-state-city";
import moment from "moment";
import Card from "react-bootstrap/Card";
import {
  addNewCategory,
  fetchCategoriesList,
} from "../../features/actions/categoryActions";
import MultipleImagesUpload from "../../components/common/MultipleImagesUpload";
import { fetchEventList } from "../../features/actions/eventAction";
import { MdClear } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import LoadingButton from "../events/LoadingButton";

// ----------------------------------------------------------------------------------------------
const AddCategory = () => {
  const [count, setCount] = useState(1);
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
      productCategory: [{ categoryName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productCategory",
  });
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryIndividualList, isLoading } = useSelector(
    (state) => state.category
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (categoryIndividualList.status === "SUCCESS") {
      navigate("/category");
    }
  }, [categoryIndividualList]);

  // ----------------------------------------- Key Person's Add and Remove Functionality Section - Finished --------------------------

  // This method is used to submit new category  form data.
  const onSubmit = (formData) => {
    // let newData = {};
    let arrObj = [];
    for (var i = 0; i < formData?.productCategory?.length; i++) {
      arrObj.push({
        productCategory: formData?.productCategory[i].categoryName,
      });
    }
    let newData = {
      category: formData.Category,
      productCategories: arrObj,
    };
    dispatch(addNewCategory(newData));
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
              Add New Category
            </h2>
          </Col>
        </Row>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 p-2 border border-2 rounded-2"
        >
          <Row className="">
            <Col sm={12} md={6} className="mx-auto">
              <Form.Group className="mt-3" controlId="shopName">
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
                      value: customFieldregex,
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
                  <Form.Label className="pb-1">
                    Product Category Name
                  </Form.Label>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => append({ categoryName: "" })}
                  >
                    <GrAdd />
                    {/* append */}
                  </button>
                </div>
                {fields.map((item, index) => (
                  <div className="d-flex flex-column" key={item.id}>
                    <div className="d-flex my-2">
                      <Form.Control
                        type="text"
                        placeholder="Enter Product Category Name"
                        {...register(`productCategory.${index}.categoryName`, {
                          required: {
                            value: true,
                            message: "Product Category Name is required",
                          },
                        })}
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
                    </div>
                    <div>
                      {errors?.productCategory?.[index]?.categoryName && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {/* <span className="fw-normal fs-6 text-danger">
                  {errors?.productCategory && "This Field is required"}
                </span> */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <div className="col-12 d-flex justify-content-end align-items-end">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-25 py-2 fw-medium fs-6"
                >
                  Submit
                </button>
              )}
            </div>
          </Row>
        </Form>
      </Container>
    </section>
  );
};

export default AddCategory;

// ------------------------------------------- THE END -------------------------------------------
