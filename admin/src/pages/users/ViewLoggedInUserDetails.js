import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import styles from "./User.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import ProfilePH from "../../assets/images/ProfilePH.jpg";
import { useForm,Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../features/actions/userActions";


import Select from "react-select";
import LoadingButton from "../events/LoadingButton";
// -----------------------------------------------------------

const ViewLoggedInUserDetails = () => {
  const { rolesList } = useSelector((state) => state.role);
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const { loggedInUserData } = useAuth();
  const [profile, setProfile] = useState(
    loggedInUserData?.profilePic || ProfilePH
  );
  const { role, _id } = rolesList.find(
    (item) => item.role === loggedInUserData.role
  );
  console.log(role, _id);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: loggedInUserData?.name,
      email: loggedInUserData?.email,
      role: {
        label: role,
        value: _id,
      },
      // permissions: state?.permissions?.map((item) => {
      //   return {
      //     label: item?.permission,
      //     value: item?._id,
      //   };
      // }),
    },
  });

  const [modifiedRolesList, setModifiedRolesList] = useState([]);
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
  }, [rolesList]);
 
  const onSubmit = (data)=>{
    console.log(data)
    const { name,profilePic } = data;

    const formData = new FormData();
    formData.append("name", name);
   
   
    formData.append("profilePic", profilePic?.[0]);
    console.log("user",loggedInUserData)
    dispatch(updateUserDetails({ userId: loggedInUserData?.userId, payload: formData }));
  }

  const [editForm, setEditForm] = useState(false);
  const navigate = useNavigate();

  const handleImage = (files) => {
    const image = window.URL.createObjectURL(files[0]);
    setProfile(image);
    console.log("image", image);
  };
  console.log(loggedInUserData?.role === 'SUPER_ADMIN' || loggedInUserData?.role === 'SUPER_ADMIN')
  const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <section>
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            navigate("/");
          }}
          aria-labelledby="shop-details-modal"
          backdrop="static"
          keyboard={false}
          dialogClassName={styles.modalWidth}
          contentClassName={styles.modalHeight}
        >
          <Modal.Header>
            <Modal.Title id="shop-details-modal" className="text-center">
              User's Details
            </Modal.Title>
           <div className="d-flex gap-2">
           <Button
              variant="primary"
              onClick={() => {
                setEditForm(!editForm);
              }}
            >
              Edit <AiTwotoneEdit />{" "}
            </Button>
            <Button
                      variant="secondary"
                      onClick={() => {
                        setShowModal(false);
                        navigate("/");
                      }}
                    >
                      Close
                    </Button>
           </div>
          </Modal.Header>
          <Modal.Body>
            <section>
              {!editForm ? (
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>Full Name</th>
                      <td> {loggedInUserData?.name}</td>
                    </tr>
                    <tr>
                      <th>Email Address</th>
                      <td>{loggedInUserData?.email}</td>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <td> {loggedInUserData?.role}</td>
                    </tr>
                    <tr>
                      <th>Permissions</th>
                      <td>
                        <ul className="px-0">
                          {loggedInUserData?.permissions.map(
                            (permission, i) => {
                              return (
                                <li className="m-0 p-0" key={i}>
                                  {`■ ${permission}` || "N.A"}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>Profile Picture</th>
                      <td>
                        {loggedInUserData?.profilePic ? (
                          <img
                            width={100}
                            height={100}
                            src={loggedInUserData?.profilePic}
                            alt="profile picture"
                          />
                        ) : (
                          "N.A"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Form.Group as={Col} controlId="formFile">
                      <Form.Label className="fw-medium">
                        Profile Picture
                      </Form.Label>
                      <Form.Control
                        {...register("profilePic", {
                          onChange: (event) => handleImage(event.target.files),
                        })}
                        className="d-none"
                        type="file"
                      />
                      <div style={{ width: "fit-content" }} className="">
                        {" "}
                        <img
                          className=""
                          width={100}
                          height={100}
                          style={{ borderRadius: "50%" }}
                          // src={ProfilePH}
                          src={profile}
                        />{" "}
                        <Form.Label
                          class="editBtn "
                          style={{
                            position: "absolute",
                            left: "6.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <AiTwotoneEdit />
                          <style jsx>{`
                            .editBtn:hover {
                              color: #0069d9;
                            }
                          `}</style>
                        </Form.Label>{" "}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label className="fw-medium">Full Name</Form.Label>
                      <Form.Control
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Full Name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label className="fw-medium">
                        Email Address{" "}
                        <span style={{ fontSize: "0.8rem" }}>
                          (Note: You are not allowed to update your
                          email/username or password)
                        </span>
                      </Form.Label>
                      <Form.Control
                        style={{ cursor: "not-allowed" }}
                        disabled
                        {...register("email", { required: true })}
                        type="text"
                        placeholder="Email Address"
                      />
                    </Form.Group>
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.role && "User Name is Required"}
                    </span>
                  </Row>
                  {
                    loggedInUserData?.role === 'SUPER_ADMIN'   &&  <Row className="mb-3">
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

                   
                  </Row>
                  }
                 
                  <div className="d-flex gap-2">
                    {
                      isLoading ?  <LoadingButton/> : <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    }
                   
                    
                  </div>
                </Form>
              )}
            </section>
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
};

export default ViewLoggedInUserDetails;
