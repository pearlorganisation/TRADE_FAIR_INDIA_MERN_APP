import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EventCategory.module.css";
import { customFieldregex } from "../../../utils/regexes";
import LoadingButton from "../../events/LoadingButton";
import { toast } from "react-toastify";
import { updateEventCategory } from "../../../features/actions/eventCategory";
import { updateListYourEventLink } from "../../../features/actions/listYourEventLinkAction";

// ----------------------------------------------------------------------------
const UpdateListYourEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isCategoryUpdationApiCalled, setIsCategoryUpdationApiCalled] =
    useState(false);
  const { state } = location;

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
    defaultValues: state,
  });

  const { isLoading, listYourEventLink } = useSelector(
    (state) => state.listYourEventLink
  );

  const onSubmit = (data) => {
    console.log("listYourEventLink::", data);
    dispatch(
      updateListYourEventLink({
        id: state?._id,
        payload: data,
      })
    );
    // setIsCategoryUpdationApiCalled(true);
  };
  useEffect(() => {
    if (listYourEventLink?.success) {
      navigate("/client/listYourEvent");
    }
    console.log("state::", state);
  }, [listYourEventLink]);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="p-0">
              <h2
                className={`text-center text-danger mb-3 py-2 ${styles.addUserTitle}`}
              >
                Update List Your Event
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
                    placeholder="Please Event category"
                    {...register("url", {
                      required: {
                        value: true,
                        message: "URL Link is required!!",
                      },
                      pattern: {
                        value: customFieldregex,
                        message: "Event category  Name is invalid",
                      },
                      minLength: {
                        value: 2,
                        message: "URL Link cannot be less than 2 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message: "URL Link cannot be more than 20 characters.",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.url?.message}
                  </span>
                </Form.Group>
              </Col>

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
                    Update
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

export default UpdateListYourEvent;
