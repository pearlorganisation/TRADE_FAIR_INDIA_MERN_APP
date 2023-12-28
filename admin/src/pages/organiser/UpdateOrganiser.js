import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "./Organiser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { City } from "country-state-city";
import {
  addOrganiser,
  updateOrganiserDetails,
} from "../../features/actions/organiserActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MultipleImagesUpload from "../../components/common/MultipleImagesUpload";
import { toast } from "react-toastify";
import LoadingButton from "../events/LoadingButton";

const UpdateOrganiser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityRef = useRef("");
  const logoRef = useRef(null);
  const organiserImageRef = useRef(null);
  const { state } = useLocation();
  console.log("OrganiserState::",state)

  useEffect(() => {
    if (!state?._id) navigate("/", { replace: true });
  }, []);

  const [organiserUpdateFormData, setOrganiserUpdateFormData] = useState([]);

  useEffect(() => {
    setOrganiserUpdateFormData(state);
  }, [state]);

  let organiserId = state?._id;

  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: state?.companyName,
      address: state?.address,
      state: state?.state,
      city: state?.city,
      // logo: state?.logo,
      // images: state?.images,
      websiteUrl: state?.websiteUrl,
      email: state?.email,
      insta: state?.insta,
      fb: state?.fb,
      twitter: state?.twitter,
      linkedIn: state?.linkedIn,
      phoneNumber: state?.phoneNumber,
      contactPerson: state?.contactPerson,
    },
  });

  const { statesList } = useSelector((state) => state.global);
  const { isLoading, isOrganiserCreationSuccess, organiserList } = useSelector(
    (state) => state.organiser
  );

  //For State and Cities Data
  const [modifiedStatesList, setModifiedStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  //For Logo Image Data
  const [showLogoImg, setShowLogoImg] = useState();
  const [showLogoFile, setShowLogoFile] = useState();

  //For Organiser Image Data
  const [showOrganiserImg, setShowOrganiserImg] = useState();
  const [showOrganiserFile, setShowOrganiserFile] = useState();

  const [completeData, setCompleteData] = useState([]);

  useEffect(() => {
    setCompleteData([organiserUpdateFormData, showOrganiserFile]);
  }, [showOrganiserFile, organiserUpdateFormData]);

  const handleUpdateOrganiser = (formValues) => {
    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      logo,
      images,
      websiteUrl,
      email,
      insta,
      fb,
      twitter,
      linkedIn,
      phoneNumber,
    } = formValues;

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("address", address);
    formData.append("contactPerson", JSON.stringify(contactPerson));
    formData.append("logo", showLogoFile || logo);
    Array.from(completeData[1] || [])?.forEach((photo) => {
      formData.append("organiserImages", photo);
    });
    formData.append("websiteUrl", websiteUrl);
    formData.append("email", email);
    formData.append("insta", insta);
    formData.append("fb", fb);
    formData.append("twitter", twitter);
    formData.append("linkedIn", linkedIn);
    formData.append("phoneNumber", phoneNumber);
    formData.append(
      "city",
      formValues?.city?.value || formValues?.city || state?.city
    );
    formData.append(
      "state",
      formValues?.state?.value || formValues?.state || state?.state
    );
    organiserId
      ? dispatch(updateOrganiserDetails({ organiserId, payload: formData }))
      : toast.error("Organiser Id is Required", {
          position: "top-right",
        });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contactPerson",
  });

  //This block of code is used to set Indian States dropdown values
  useEffect(() => {
    if (statesList?.length > 0) {
      setModifiedStatesList(
        statesList.map((state) => {
          return {
            label: state?.name,
            value: state?.isoCode,
          };
        })
      );
    }
  }, [statesList, citiesList]);

  //This block of code is used to set Indian State's Cities dropdown Values
  const fetchCitiesList = (state) => {
    const citiesList = City.getCitiesOfState("IN", state?.value);
    setCitiesList(
      citiesList.map((city) => {
        return {
          label: city?.name,
          value: city?.name,
        };
      })
    );
  };

  //******This block of code is used to update organiser logo image Starts Here*****//
  const handleUploadLogo = () => {
    logoRef.current.click();
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    setShowLogoImg(URL.createObjectURL(file));
    setShowLogoFile(file);
  };

  useEffect(() => {
    setShowLogoImg(state?.logo);
  }, []);

  //******* Ends Here*********//

  //******This block of code is used to update organiser logo image Starts Here*****//
  const handleUploadOrganiserImage = () => {
    organiserImageRef.current.click();
  };

  const handleOrganierImage = (e) => {
    const file = e.target.files;
    const orgImg = [];
    for (let i = 0; i < file.length; i++) {
      const imgFile = URL.createObjectURL(file[i]);
      orgImg.push({path:imgFile});
    }
    setShowOrganiserImg(orgImg);
    setShowOrganiserFile(file);
  };

  useEffect(() => {
    setShowOrganiserImg(state?.images);
  }, []);

  //******* Ends Here*********//

  useEffect(() => {
    fetchCitiesList({
      value: state?.state,
    });
  }, []);

  useEffect(() => {
    if (isOrganiserCreationSuccess) {
      navigate("/organiser");
    }
  }, [isOrganiserCreationSuccess]);

  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium py-2 text-center"
            style={{ background: "rgb(71 76 114)", color: "white" }}
          >
            Update Organiser Form
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateOrganiser)}
            className="border border-1 rounded-1 p-2 mt-1"
          >
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="companyName" className="form-label fw-medium">
                    Company Name
                  </label>
                  <input
                    {...register("companyName", {
                      required: {
                        message: "Company Name is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="companyName"
                  />
                  {errors.companyName && (
                    <span className="text-danger">
                      {errors?.companyName?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="email" className="form-label fw-medium">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: {
                        message: "Email is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="email"
                  />
                  {errors.email && (
                    <span className="text-danger">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="websiteUrl" className="form-label fw-medium">
                    Website Link
                  </label>
                  <input
                    {...register("websiteUrl", {
                      required: {
                        message: "Url is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="websiteUrl"
                  />
                  {errors.websiteUrl && (
                    <span className="text-danger">
                      {errors?.websiteUrl?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="insta" className="form-label fw-medium">
                    Instagram Links
                  </label>
                  <input
                    {...register("insta", {
                      required: {
                        message: "Url is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="insta"
                  />
                  {errors.insta && (
                    <span className="text-danger">
                      {errors?.insta?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="fb" className="form-label fw-medium">
                    Facebook Link
                  </label>
                  <input
                    {...register("fb", {
                      required: {
                        message: "Url is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="fb"
                  />
                  {errors.fb && (
                    <span className="text-danger">{errors?.fb?.message}</span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="twitter" className="form-label fw-medium">
                    Twitter Links
                  </label>
                  <input
                    {...register("twitter", {
                      required: {
                        message: "Url is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="twitter"
                  />
                  {errors.twitter && (
                    <span className="text-danger">
                      {errors?.twitter?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="linkedIn" className="form-label fw-medium">
                    Linkedin Link
                  </label>
                  <input
                    {...register("linkedIn", {
                      required: {
                        message: "Url is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="linkedIn"
                  />
                  {errors.linkedIn && (
                    <span className="text-danger">
                      {errors?.linkedIn?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="phoneNumber" className="form-label fw-medium">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: {
                        message: "Phone no is required",
                        value: true,
                      },
                    })}
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                  />
                  {errors.phoneNumber && (
                    <span className="text-danger">
                      {errors?.phoneNumber?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="logo" className="form-label fw-medium">
                    Organiser Logo
                  </label>
                  <Controller
                    control={control}
                    name={"logo"}
                    // rules={{ required: "Logo is required" }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <>
                          <div
                            className="btn btn-outline-info m-2"
                            onClick={() => handleUploadLogo()}
                          >
                            Edit
                          </div>
                          <div className="w-100 h-100">
                            <img
                              src={showLogoImg}
                              alt="logo"
                              style={{ width: "200px", height: "200px" }}
                            />
                          </div>
                          <input
                            {...field}
                            value={value?.fileName}
                            onChange={(event) => {
                              handleLogo(event);
                            }}
                            ref={logoRef}
                            type="file"
                            id="logo"
                            className="form-control"
                            style={{ display: "none" }}
                          />
                        </>
                      );
                    }}
                  />
                  {errors.logo && (
                    <span className="text-danger">{errors?.logo?.message}</span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="images" className="form-label fw-medium">
                    Organiser Images
                  </label>
                  <Controller
                    control={control}
                    name={"images"}
                    // rules={{ required: "Images is required" }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <>
                          <div
                            className="btn btn-outline-info m-2"
                            onClick={() => handleUploadOrganiserImage()}
                          >
                            Edit
                          </div>
                          <div className="w-100 h-100">
                            {showOrganiserImg?.map((viewImage) => {
                              return (
                                <img
                                  src={viewImage.path}
                                  alt="images"
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    margin: "10px",
                                  }}
                                />
                              );
                            })}
                            <input
                              {...field}
                              value={value?.fileName}
                              onChange={(event) => {
                                handleOrganierImage(event);
                              }}
                              ref={organiserImageRef}
                              type="file"
                              id="images"
                              className="form-control"
                              style={{ display: "none" }}
                              multiple
                            />
                          </div>
                        </>
                      );
                    }}
                  />
                  {errors.images && (
                    <span className="text-danger">
                      {errors?.images?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="state" className="form-label fw-medium">
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={modifiedStatesList}
                        value={modifiedStatesList.find(
                          (c) => c.value === value
                        )}
                        onChange={(val) => {
                          onChange(val);
                          resetField("city");
                          fetchCitiesList(val);
                        }}
                        defaultValue={modifiedStatesList.find(
                          (c) => c.value === state?.State
                        )}
                      />
                    )}
                    rules={{
                      required: { message: "State is required", value: true },
                    }}
                  />
                  {errors?.state && (
                    <span className="text-danger">
                      {errors?.state?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="city" className="form-label fw-medium">
                    City
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    ref={cityRef}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={citiesList}
                        value={citiesList.find((c) => c.value === value)}
                        onChange={(val) => {
                          onChange(val);
                        }}
                        defaultValue={citiesList.find(
                          (c) => c.value === state?.City
                        )}
                      />
                    )}
                    rules={{
                      required: { message: "City is required", value: true },
                    }}
                  />
                  {errors.city && (
                    <span className="text-danger">{errors?.city?.message}</span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <div className="form-row">
                  <label htmlFor="address" className="form-label fw-medium">
                    Address
                  </label>
                  <textarea
                    {...register("address", {
                      required: {
                        message: "Address is required",
                        value: true,
                      },
                    })}
                    className="form-control"
                    id="address"
                    rows="6"
                  ></textarea>
                  {errors.address && (
                    <span className="text-danger">
                      {errors?.address?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <div className="add_contact">
              <div>
                <div className="my-3 d-flex justify-content-end">
                  <Link
                    className="btn btn-outline-info btn-sm mx-4 mt-2"
                    onClick={() =>
                      append({ contactPersonName: "", contactNumber: "" })
                    }
                  >
                    Add more
                  </Link>
                </div>

                {fields.map((item, index) => (
                  <li
                    className="mx-auto"
                    key={item.id}
                    style={{ width: "83%" }}
                  >
                    <div className="border border-1 rounded-1 p-3 my-2">
                      <div className="row">
                        <h4 className={styles.organiser_details}>
                          Organiser's Contact Person Details
                        </h4>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                          <div className="form-row my-2">
                            <label
                              htmlFor="contactPersonName"
                              className="form-label fw-medium"
                            >
                              Name of Contact Person
                            </label>
                            <input
                              {...register(
                                `contactPerson.${index}.contactPersonName`,
                                {
                                  required: {
                                    message: "Contact Person Name is required",
                                  },
                                }
                              )}
                              type="text"
                              className="form-control"
                              id="contactPersonName"
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-row my-2">
                            <label
                              htmlFor="contactNumber"
                              className="form-label fw-medium"
                            >
                              Contact Number
                            </label>
                            <input
                              {...register(
                                `contactPerson.${index}.contactNumber`,
                                {
                                  required: {
                                    message: "Contact Number is required",
                                  },
                                }
                              )}
                              type="text"
                              className="form-control"
                              id="contactNumber"
                            />
                          </div>
                        </div>
                        <div className="col-md-1 d-flex align-items-center mt-4">
                          <div className="form-row">
                            {fields.length > 1 && (
                              <button
                                className="btn btn-outline-danger"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.contactPerson && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </div>
            </div>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateOrganiser;
