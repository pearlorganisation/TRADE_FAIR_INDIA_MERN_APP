import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { emailRegex, nameRegex } from "../../utils/regexes";
import LoadingButton from "../events/LoadingButton";
import Select from "react-select";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../features/actions/userActions";

// ----------------------------------------------------------------------------
const UpdateUser = () => {
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
      name: state?.name,
      email: state?.email,
      role: {
        label: state?.role?.role,
        value: state?.role?._id,
      },
      // permissions: state?.permissions?.map((item) => {
      //   return {
      //     label: item?.permission,
      //     value: item?._id,
      //   };
      // }),
    },
  });

  const profileImageRef = useRef();

  const { isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.user
  );
  const { rolesList } = useSelector((state) => state.role);
  // const { permissionsList } = useSelector((state) => state.permission);

  const [modifiedRolesList, setModifiedRolesList] = useState([]);
  // const [modifiedPermissionsList, setModifiedPermissionsList] = useState([]);
  const [isUserUpdationApiCalled, setIsUserUpdationApiCalled] = useState(false);
  const [profileImageLogo, setProfileImageLogo] = useState("");
  const [isProfileImageChanged, setIsProfileImageChanged] = useState(false);

  useEffect(() => {
    if (Array.isArray(rolesList) && rolesList?.length > 0) {
      setModifiedRolesList(
        rolesList.map((role) => {
          return {
            label: role?.role,
            value: role?._id,
          };
        })
      );
    }

    // if (Array.isArray(permissionsList) && permissionsList?.length > 0) {
    //   setModifiedPermissionsList(
    //     permissionsList.map((permission) => {
    //       return {
    //         label: permission?.permission,
    //         value: permission?._id,
    //       };
    //     })
    //   );
    // }
  }, [rolesList]);
  // permissionsList

  // Redirection to Users Listing Page after User Updation
  useEffect(() => {
    if (isSuccess && !errorMessage && isUserUpdationApiCalled)
      navigate("/users");
  }, [navigate, errorMessage, isSuccess, isUserUpdationApiCalled]);

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      isUserUpdationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isUserUpdationApiCalled]);

  // This block of code is used to show image preview after uploading profile's image.
  useEffect(() => {
    const imageData = watch("profilePic")?.[0];
    const url = imageData?.[0]
      ? window.URL.createObjectURL(imageData?.[0])
      : imageData
      ? window.URL.createObjectURL(imageData)
      : "";
    url && setProfileImageLogo(url);
  }, [watch("profilePic")]);

  useEffect(() => {
    setProfileImageLogo(state?.profilePic);
  }, [state]);

  const onSubmit = (data) => {
    const { name, email, password, permissions, role, profilePic } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role?.value);
    // formData.append(
    //   "permissions",
    //   JSON.stringify(
    //     Array.isArray(permissions) && permissions?.length > 0
    //       ? permissions.map((permission) => permission?.value)
    //       : []
    //   )
    // );
    formData.append("profilePic", profilePic?.[0]);

    dispatch(updateUserDetails({ userId: state?._id, payload: formData }));
    setIsUserUpdationApiCalled(true);
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
                Update User's details
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
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete={"off"}
                    placeholder="Please enter your Full Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                      pattern: {
                        value: nameRegex,
                        message: "Full Name is invalid",
                      },
                      minLength: {
                        value: 5,
                        message: "Full Name cannot be less than 5 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Full Name cannot be more than 50 characters.",
                      },
                    })}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.name?.message}
                  </span>
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Row>
                  <Col sm={12} md={6}>
                    <Form.Group className="mb-3" controlId="profileImage">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        autoComplete={"off"}
                        placeholder="Please enter your Full Name"
                        {...register("profilePic", {
                          required: {
                            value: false,
                            message: "Profile Image is required",
                          },
                        })}
                      />
                      <span className="fw-normal fs-6 text-danger">
                        {errors?.profilePic?.message}
                      </span>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={6}>
                    {profileImageLogo && (
                      <img
                        className="my-2"
                        style={{ cursor: "pointer" }}
                        src={profileImageLogo || ""}
                        alt="profile logo"
                        width="200"
                        height="200"
                        ref={profileImageRef}
                        onMouseOver={() => {
                          profileImageRef.current.style.width = "400px";
                          profileImageRef.current.style.height = "400px";
                        }}
                        onMouseOut={() => {
                          profileImageRef.current.style.width = "200px";
                          profileImageRef.current.style.height = "200px";
                        }}
                      />
                    )}

                    <div>
                      <span className="fw-normal fs-6 text-danger">
                        {errors?.shopLogo?.message}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>Select Role</Form.Label>
                  <Controller
                    name="role"
                    autoComplete={"off"}
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={modifiedRolesList}
                        onChange={(val) => {
                          onChange(val);
                        }}
                        isClearable
                        value={value || null}
                        defaultValue={modifiedRolesList}
                      />
                    )}
                    rules={{
                      required: {
                        message: "Role is required",
                        value: true,
                      },
                    }}
                  />
                  <span className="fw-normal fs-6 text-danger">
                    {errors?.role?.message}
                  </span>
                </Form.Group>
              </Col>

              {/* <Col sm={12} md={6}>
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
              </Col> */}

              <Col sm={12} md={6}>
                <div className="d-flex flex-column gap-2">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address &nbsp;&nbsp;&nbsp;
                    </label>
                    {/* <p className="text-muted">
                      (Note: Your Email Id will be your username)
                    </p> */}
                    <input
                      type="text"
                      autoComplete={"off"}
                      className="form-control"
                      id="email"
                      disabled
                      placeholder="Please enter your email address"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email Address is required",
                        },
                        pattern: {
                          value: emailRegex,
                          message: "Email Address is invalid",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="text-danger pt-1">
                        {errors?.email?.message || "Email is required"}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted">
                  (Note: You are not allowed to update your email/username or
                  password)
                </p>
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

export default UpdateUser;
