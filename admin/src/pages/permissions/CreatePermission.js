import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Permission.module.css";
import { customFieldregex } from "../../utils/regexes";
import LoadingButton from "../events/LoadingButton";
import { toast } from "react-toastify";
import { createPermission } from "../../features/actions/permissionActions";

// ----------------------------------------------------------------------------
const CreatePermission = () => {
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

  const { isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.permission
  );

  const [isPermissionCreationApiCalled, setIsPermissionCreationApiCalled] =
    useState(false);

  // Redirection to Permission's Listing Page after Permission Creation
  useEffect(() => {
    if (isSuccess && !errorMessage && isPermissionCreationApiCalled)
      navigate("/permissions");
  }, [navigate, errorMessage, isSuccess, isPermissionCreationApiCalled]);

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      isPermissionCreationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isPermissionCreationApiCalled]);

  const onSubmit = (formData) => {
    dispatch(createPermission(formData));
    setIsPermissionCreationApiCalled(true);
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
                Add New Permission
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
                  <Form.Label>Permission Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete={"off"}
                    placeholder="Please enter Permission Name"
                    {...register("permission", {
                      required: {
                        value: true,
                        message: "Permission Name is required",
                      },
                      pattern: {
                        value: customFieldregex,
                        message: "Permission Name is invalid",
                      },
                      minLength: {
                        value: 2,
                        message:
                          "Permission Name cannot be less than 2 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Permission Name cannot be more than 20 characters.",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.permission?.message}
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

export default CreatePermission;
