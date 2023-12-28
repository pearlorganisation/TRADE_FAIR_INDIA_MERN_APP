import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import UploadImage from "../../assets/images/UploadBanner.png";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "./Organiser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { City } from "country-state-city";
import { generateDynamicUrl } from "../../utils";
import { addOrganiser } from "../../features/actions/organiserActions";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../events/LoadingButton";

const CreateOrganiser = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactPerson: [{ contactPersonName: "", contactNumber: "" }],
    },
  });

  const disptach = useDispatch();
  const cityRef = useRef("");
  const navigate = useNavigate();

  const { statesList } = useSelector((state) => state.global);
  const { isLoading, isSuccess, isOrganiserCreationSuccess } = useSelector(
    (state) => state.organiser
  );

  const [modifiedStatesList, setModifiedStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const { randomString, dynamicUrl: organiserUrl } =
    generateDynamicUrl("organiser");
  const handleOrganiser = (formValues) => {
    const {
      companyName,
      address,
      state,
      city,
      contactPerson,
      logo,
      organiserImages,
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
    formData.append("randomString", randomString);
    formData.append("organiserUrl", organiserUrl);
    formData.append("address", address);
    formData.append("contactPerson", JSON.stringify(contactPerson));
    formData.append("logo", logo);
    // formData.append("images", images);
    Array.from(formValues?.organiserImages).forEach((photo) => {
      formData.append("organiserImages", photo);
    });
    formData.append("websiteUrl", websiteUrl);
    formData.append("email", email);
    formData.append("insta", insta);
    formData.append("fb", fb);
    formData.append("twitter", twitter);
    formData.append("linkedIn", linkedIn);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", formValues?.city?.value);
    formData.append("state", formValues?.state?.value);
    disptach(addOrganiser(formData));
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
  }, [statesList]);

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

  useEffect(() => {
    if (isOrganiserCreationSuccess) {
      navigate("/organiser");
    }
  }, [isOrganiserCreationSuccess]);

  return (
    <>
      <div style={{ paddingBottom: "5rem" }} className="container">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium py-2 text-center"
            style={{ background: "rgb(71 76 114)", color: "white" }}
          >
            Organiser Registration
          </div>
          <form
            onSubmit={handleSubmit(handleOrganiser)}
            className="border border-1 rounded-1 p-2 mt-1"
          >
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="companyName" className="form-label fw-medium">
                    Organiser Name
                  </label>
                  <input
                    {...register("companyName", {
                      required: {
                        message: "Organiser Name is required",
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
                    {...register("insta")}
                    type="text"
                    className="form-control"
                    id="insta"
                  />
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
                    {...register("fb")}
                    type="text"
                    className="form-control"
                    id="fb"
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="twitter" className="form-label fw-medium">
                    Twitter Links
                  </label>
                  <input
                    {...register("twitter")}
                    type="text"
                    className="form-control"
                    id="twitter"
                  />
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
                    {...register("linkedIn")}
                    type="text"
                    className="form-control"
                    id="linkedIn"
                  />
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
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <input
                          {...field}
                          value={value?.fileName}
                          onChange={(event) => {
                            onChange(event.target.files[0]);
                          }}
                          type="file"
                          id="logo"
                          className="form-control"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="images" className="form-label fw-medium">
                    Organiser Images
                  </label>
                  {/* <Controller
                    control={control}
                    name={"organiserImages"}
                    rules={{ required: "Images is required" }}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <input
                          {...field}
                          value={value?.fileName}
                          onChange={(event) => {
                            onChange(
                              event.target.files?.length > 1
                                ? event.target.files
                                : event.target.files[0]
                            );
                          }}
                          type="file"
                          id="images"
                          className="form-control"
                          multiple
                        />
                      );
                    }}
                  /> */}
                  <input
                    {...register("organiserImages")}
                    type="file"
                    className="form-control"
                    id="organiserImages"
                    multiple
                  />
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
                        onChange={(val) => {
                          onChange(val);
                          resetField("city");
                          fetchCitiesList(val);
                        }}
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
                        onChange={(val) => onChange(val)}
                        value={value || null}
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
                    <div className="border border-1 rounded-1 p-3">
                      <div className="row">
                        <h4 className={styles.organiser_details}>
                          Organiser's Contact Person Details
                        </h4>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                          <div className="form-row my-2">
                            <label
                              htmlFor="contactPerson"
                              className="form-label fw-medium"
                            >
                              Name of Contact Person
                            </label>
                            <input
                              {...register(
                                `contactPerson.${index}.contactPersonName`,
                                {
                                  required: {
                                    value: true,
                                    message: "Contact Person Name is required",
                                  },
                                }
                              )}
                              type="text"
                              className="form-control"
                              id="contactPerson"
                            />
                            {errors?.contactPerson?.[index]
                              ?.contactPersonName && (
                              <span className="text-danger">
                                Contact Person Name is required
                              </span>
                            )}
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
                                    value: true,
                                    message: "Contact Number is required",
                                  },
                                }
                              )}
                              type="text"
                              className="form-control"
                              id="contactNumber"
                            />
                            {errors?.contactPerson?.[index]?.contactNumber && (
                              <span className="text-danger">
                                Contact Person Phone Number is required
                              </span>
                            )}
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

export default CreateOrganiser;
