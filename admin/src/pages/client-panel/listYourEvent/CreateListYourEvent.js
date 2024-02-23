import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EventCategory.module.css";
import LoadingButton from "../../events/LoadingButton";
import { toast } from "react-toastify";

import Select from "react-select";
import { createEventCategory } from "../../../features/actions/eventCategory";

// ----------------------------------------------------------------------------
const CreateListYourEvent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
    getValues,
    setValue,
    watch,
    reset,
    resetField,
    getFieldState,
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading, isEventCategoryCreated, errorMessage } = useSelector(
    (state) => state.eventCategory
  );

  if (isEventCategoryCreated) {
    navigate("/client/eventCategories");
  }
  const [
    isEventCategoryCreationApiCalled,
    setIsEventCategoryCreationApiCalled,
  ] = useState(false);

  // Redirection to Roles Listing Page after event category Creation

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      isEventCategoryCreationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isEventCategoryCreationApiCalled]);

  const onSubmit = (formData) => {
    console.log(formData);
    // dispatch(createEventCategory({ category: formData?.eventCategory }));
    // setIsEventCategoryCreationApiCalled(true);
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="p-0">
              <h2
                className={`text-center text-danger mb-3 py-2 ${styles.addUserTitle}`}
              >
                Add New List Your Event
              </h2>
            </Col>
          </Row>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-2"
            autoComplete="off"
          >
            <Row>
              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>List Your Event</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete={"off"}
                    placeholder="Please enter list your event"
                    {...register("eventCategory", {
                      required: {
                        value: true,
                        message: "Event category Name is required",
                      },

                      minLength: {
                        value: 2,
                        message:
                          "Event category cannot be less than 2 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Event category cannot be more than 20 characters.",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.eventCategory?.message}
                  </span>
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Label>Event category Image</Form.Label>
                <div class="input-group mb-3">
                  <input
                  {...register("eventCategoryImage", {
                    required: {
                      value: true,
                      message: "Event category Image is required",
                    },

                    minLength: {
                      value: 2,
                      message:
                        "Event category Image cannot be less than 2 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message:
                        "Event category Image cannot be more than 20 characters.",
                    },
                  })}
                    type="file"
                    class="form-control"
                    id="inputGroupFile02"
                  />
                  <label class="input-group-text" for="inputGroupFile02">
                    Upload
                  </label>
                </div>
                <span className="fw-normal fs-6 text-danger">
                    {errors?.eventCategoryImage?.message}
                  </span>
              </Col> */}
              <Col
                sm={12}
                md={12}
                className="d-flex justify-content-end align-items-end"
              >
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary w-20 py-2 fw-medium fs-6"
                  >
                    Submit
                  </button>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default CreateListYourEvent;
