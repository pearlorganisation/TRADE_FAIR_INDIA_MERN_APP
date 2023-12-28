import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Role.module.css";
import { customFieldregex } from "../../utils/regexes";
import LoadingButton from "../events/LoadingButton";
import { toast } from "react-toastify";
import { updateRole } from "../../features/actions/roleActions";
import Select from "react-select";

// ----------------------------------------------------------------------------
const UpdateRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    mode: "onTouched",
    defaultValues: {
      role: state?.role,
      permissions: state?.permissions?.map((item) => {
        return {
          label: item?.permission,
          value: item?._id,
        };
      }),
    },
  });

  const { isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.role
  );
  const { permissionsList } = useSelector((state) => state.permission);

  const [isRoleUpdationApiCalled, setIsRoleUpdationApiCalled] = useState(false);
  const [modifiedPermissionsList, setModifiedPermissionsList] = useState([]);

  useEffect(() => {
    if (Array.isArray(permissionsList) && permissionsList?.length > 0) {
      setModifiedPermissionsList(
        permissionsList.map((permission) => {
          return {
            label: permission?.permission,
            value: permission?._id,
          };
        })
      );
    }
  }, [permissionsList]);

  // Redirection to Roles Listing Page after Role Updation
  useEffect(() => {
    if (isSuccess && !errorMessage && isRoleUpdationApiCalled)
      navigate("/roles");
  }, [navigate, errorMessage, isSuccess, isRoleUpdationApiCalled]);

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      isRoleUpdationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isRoleUpdationApiCalled]);

  const onSubmit = (formData) => {
    const modifiedFormData = {
      ...formData,
      permissions:
        Array.isArray(formData?.permissions) &&
        formData?.permissions?.length > 0
          ? formData?.permissions.map((permission) => permission?.value)
          : [],
    };
    dispatch(updateRole({ roleId: state?._id, payload: modifiedFormData }));
    setIsRoleUpdationApiCalled(true);
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
                Update Role
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
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete={"off"}
                    placeholder="Please enter your Full Name"
                    {...register("role", {
                      required: {
                        value: true,
                        message: "Role Name is required",
                      },
                      pattern: {
                        value: customFieldregex,
                        message: "Role Name is invalid",
                      },
                      minLength: {
                        value: 2,
                        message: "Role Name cannot be less than 2 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Role Name cannot be more than 20 characters.",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.role?.message}
                  </span>
                </Form.Group>
              </Col>

              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>Select Permission</Form.Label>
                  <Controller
                    name="permissions"
                    autoComplete={"off"}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={modifiedPermissionsList}
                        onChange={(val) => {
                          onChange(val);
                        }}
                        isMulti
                        isClearable
                        value={value || null}
                        defaultValue={modifiedPermissionsList}
                      />
                    )}
                    rules={{
                      required: {
                        message: "Permission is required",
                        value: true,
                      },
                    }}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.permissions?.message}
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

export default UpdateRole;
