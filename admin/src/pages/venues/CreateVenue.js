import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { AiOutlineEye } from "react-icons/ai";
import { generateDynamicUrl } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { City } from "country-state-city";
import {
  addNewVenue,
  fetchVenuesList,
} from "../../features/actions/venueActions";
import { useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import { filterProps } from "framer-motion";

import style from "./Venue.module.css";
import LoadingButton from "../events/LoadingButton";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Location from "../../components/common/Location";
import { customFieldregex } from "../../utils/regexes";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import LocationSearch from "../../components/common/LocationSearch";

const CreateVenue = () => {
  const dispatch = useDispatch();
  const { statesList } = useSelector((state) => state.global);
  const { isLoading } = useSelector((state) => state.venue);
  const { randomString, dynamicUrl: venueUrl } = generateDynamicUrl("venue");
  const [modifiedStatesList, setModifiedStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  // const [selectedLocation, setSelectedLocation] = useState({
  //   lat: 30.3165,
  //   lng: 78.0322,
  // });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { HotelNearby: [{ link: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "HotelNearby",
  });
  // This block of code is used to set Indian states dropdown Values.
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

  // This block of code is used to set Indian State's Cities dropdown Values.
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

  const { venueList } = useSelector((state) => state.venue);

  const navigate = useNavigate();

  // const handleMapClick = (event) => {
  //   setSelectedLocation({
  //     lat: event.latLng.lat(),
  //     lng: event.latLng.lng(),
  //   });
  // };

  const onSubmit = (data) => {
    // reset();

    const finalData = {
      ...data,
      venueUrl,
      randomString,
      City: data?.City?.value,
      State: data?.State.value,
    };
    // console.log(finalData);
    dispatch(addNewVenue({ payload: finalData }));
  };

  useEffect(() => {
    if (venueList[0]?.success) {
      navigate("/venues");
    }
  }, [venueList]);

  return (
    <>
      <div className="container bg-inf py-2">
        <div
          className="col-md-12 fs-4 fw-medium mb-2 py-2 text-center"
          style={{ background: "#dee2e6" }}
        >
          Venue Registration
        </div>
        <form
          style={{ paddingBottom: "5rem" }}
          onSubmit={handleSubmit(onSubmit)}
          className="row g-3"
        >
          <div className="col-md-4">
            <label htmlFor="PlaceName" className="form-label fw-bold">
              Name of Place
            </label>
            <input
              {...register("PlaceName", {
                required: {
                  value: true,
                  message: "Place name is required",
                },
                pattern: {
                  value: customFieldregex,
                  message: "Place name is invalid",
                },
              })}
              type="text"
              className="form-control"
              id="PlaceName"
              placeholder="Enter Place Name Here..."
            />
            {errors.PlaceName && (
              <span className="text-danger">
                {errors.PlaceName.message || "This field is required"}
              </span>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="State" className="form-label fw-bold">
              State
            </label>
            <Controller
              name="State"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={modifiedStatesList}
                  value={value || null}
                  onChange={(val) => {
                    resetField("City");
                    onChange(val);
                    fetchCitiesList(val);
                  }}
                  // getOptionLabel={(e)=>e.label}
                  // getOptionValue={(e)=>e.value}
                  // closeMenuOnSelect={true}
                />
              )}
              rules={{ required: true }}
            />

            {errors.State && (
              <span className="text-danger">This field is required </span>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="City" className="form-label fw-bold">
              City
            </label>
            <Controller
              name="City"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  value={value || null}
                  options={citiesList}
                  onChange={(val) => {
                    onChange(val);
                  }}
                />
              )}
              rules={{ required: true }}
            />
            {errors.City && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          {/* <div className="col-md-12">
            <label htmlFor="GeoLocation" className="form-label fw-bold">
              Location of Event
            </label>
            <input
              {...register("GeoLocation", {
                required: {
                  value: true,
                  message: "GeoLocation is required",
                },
                pattern: {
                  value: customFieldregex,
                  message: "Geo Location is invalid",
                },
                minLength: {
                  value: 10,
                  message: "GeoLocation cannot be less than 10 characters.",
                },
                maxLength: {
                  value: 500,
                  message: "Place name cannot be more than 500 characters.",
                },
              })}
              type="text"
              className="form-control"
              id="GeoLocation"
              placeholder="Enter Location Here..."
            />
            {errors.GeoLocation && (
              <span className="text-danger">
                {errors?.GeoLocation?.message || "This field is required"}
              </span>
            )}
          </div> */}

          {/* <div className="col-md-6">
            <label htmlFor="City" className="form-label fw-bold">
              City
            </label>
            <Controller
              name="City"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  value={value || null}
                  options={citiesList}
                  onChange={(val) => {
                    onChange(val);
                  }}
                />
              )}
              rules={{ required: true }}
            />
            {errors.City && (
              <span className="text-danger">This field is required</span>
            )}
          </div> */}

          <div className="col-md-6">
            <label htmlFor="PlaceDescription" className="form-label fw-bold">
              Description of Place
            </label>
            <textarea
              {...register("PlaceDescription", {
                required: {
                  value: true,
                  message: "Place Description is required",
                },
                minLength: {
                  value: 10,
                  message:
                    "Place Description cannot be less than 10 characters.",
                },
                maxLength: {
                  value: 500,
                  message:
                    "Place Description cannot be more than 500 characters.",
                },
                pattern: {
                  value: customFieldregex,
                  message: "Description is invalid",
                },
              })}
              className="form-control"
              id="PlaceDescription"
              rows="9"
              placeholder="Enter Description Here..."
            ></textarea>
            {errors.PlaceDescription && (
              <span className="text-danger">
                {errors.PlaceDescription?.message || "This field is required"}
              </span>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="Address" className="form-label fw-bold">
              Address
            </label>
            <textarea
              {...register("Address", {
                required: {
                  value: true,
                  message: "Address is required",
                },
                minLength: {
                  value: 10,
                  message: "Address cannot be less than 10 characters.",
                },
                maxLength: {
                  value: 500,
                  message: "Address cannot be more than 500 characters.",
                },
              })}
              className="form-control"
              id="description"
              rows="9"
              placeholder="Enter Address Here..."
            ></textarea>
            {errors.Address && (
              <span className="text-danger">
                {errors.Address?.message || "This field is required"}
              </span>
            )}
          </div>

          <ul>
            <div className="md-col-12 d-flex justify-content-between align-items-center">
              <label htmlFor="HotelNearby" className="form-label fw-bold">
                Hotels NearBy
              </label>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => append({ link: "" })}
              >
                <GrAdd />
              </button>
            </div>
            {fields.map((item, index) => (
              <li className="mb-2 mt-2" key={item.id}>
                <div className="col-md-12 position-relative ">
                  <input
                    {...register(`HotelNearby.${index}.link`, {
                      required: true,
                    })}
                    type="text"
                    className="form-control"
                    id="HotelNearby"
                    placeholder="Enter Here..."
                  />
                  {errors?.HotelNearby?.[index]?.link && (
                    <span className="text-danger">This field is required</span>
                  )}
                  {fields.length > 1 && (
                    <button
                      style={{ background: "white", color: "#FF6666" }}
                      className={`btn py-0 z-1 ${style.hotelsNearBy}`}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <MdDelete className="btn-danger" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* <div className="col-md-12">
            <label htmlFor="GeoLocation" className="form-label fw-bold">
              Location of Event{" "}
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    Please select a location of your choice otherwise default
                    will select.
                  </Tooltip>
                }
              >
                <span style={{ cursor: "pointer" }} className="">
                  <AiOutlineInfoCircle />
                </span>
              </OverlayTrigger>
            </label>
            <input
              {...register("GeoLocation.loactionName", {
                required: {
                  value: true,
                  message: "GeoLocation is required",
                },
                pattern: {
                  value: customFieldregex,
                  message: "Geo Location is invalid",
                },
                minLength: {
                  value: 10,
                  message: "GeoLocation cannot be less than 10 characters.",
                },
                maxLength: {
                  value: 500,
                  message: "Place name cannot be more than 500 characters.",
                },
              })}
              // disabled
              type="text"
              className="form-control"
              id="GeoLocation"
              placeholder="Enter Location Here..."
            />
            {errors.GeoLocation && (
              <span className="text-danger">
                {errors?.GeoLocation?.message || "This field is required"}
              </span>
            )}
          </div> */}

          <div className="col-md-12">
            <label htmlFor="GeoLocation" className="form-label fw-bold">
              Location of Event{" "}
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    Please select a location of your choice otherwise default
                    will select.
                  </Tooltip>
                }
              >
                <span style={{ cursor: "pointer" }} className="">
                  <AiOutlineInfoCircle />
                </span>
              </OverlayTrigger>
            </label>
            <LocationSearch />
            {/* <Location lat={30.3165} lng={78.0322} setValue={setValue} /> */}
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
    </>
  );
};

export default CreateVenue;
