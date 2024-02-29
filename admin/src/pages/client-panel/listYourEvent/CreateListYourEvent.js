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
import { createListYourEventLink } from "../../../features/actions/listYourEventLinkAction";

// ----------------------------------------------------------------------------
const CreateListYourEvent = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const navigate = useNavigate();

  const { isLoading, listYourEventLink } = useSelector(
    (state) => state.listYourEventLink
  );

  if (listYourEventLink?.status) {
    navigate("/client/listYourEvent");
  }

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(createListYourEventLink(formData));
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
                    {...register("url", {
                      required: {
                        value: true,
                        message: "List Your Link is required",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.eventCategory?.message}
                  </span>
                </Form.Group>
              </Col>
              <Col
                sm={12}
                md={6}
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
