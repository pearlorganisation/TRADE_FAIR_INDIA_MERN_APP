import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import CreatableSelect from "react-select/creatable";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewVenue,
  updateVenueDetails,
} from "../../features/actions/venueActions";
import { customFieldregex } from "../../utils/regexes";
import { useLocation, useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import style from "./Venue.module.css";
import { City } from "country-state-city";
import LoadingButton from "../events/LoadingButton";
import Location from "../../components/common/Location";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";

const UpdateVenue = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.venue);

  const cityRef = useRef("");
  const { statesList } = useSelector((state) => state.global);
  const [modifiedStatesList, setModifiedStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Address: state?.Address,
      GeoLocation: state?.GeoLocation?.loactionName,
      HotelNearby: state?.HotelNearby,
      PlaceDescription: state?.PlaceDescription,
      PlaceName: state?.PlaceName,
      State: state?.State,
      City: state?.City,
    },
  });
  console.log(state?.GeoLocation?.loactionName);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "HotelNearby",
  });

  const { venueList } = useSelector((state) => state.venue);

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
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      City: data?.City?.value,
      State: data?.State?.value,
    };
    dispatch(updateVenueDetails({ venueId: state?._id, payload: finalData }));
  };

  useEffect(() => {
    if (venueList[0]?.success) {
      navigate("/venues");
    }
  }, [venueList]);

  useEffect(() => {
    fetchCitiesList({
      value: state?.State,
    });
  }, []);

  return (
    <>
      <div className="container bg-inf py-2">
        <div
          className="col-md-12 fs-4 fw-medium mb-2 py-2 text-center"
          style={{ background: "#dee2e6" }}
        >
          Update Venue
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
              {...register("PlaceName", { required: true })}
              type="text"
              className="form-control"
              id="PlaceName"
            />
            {errors.PlaceName && (
              <span className="text-danger">This field is required</span>
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
                  value={modifiedStatesList.find((c) => c.value === value)}
                  onChange={(val) => {
                    onChange(val);
                    resetField("City");
                    fetchCitiesList(val);
                  }}
                  defaultValue={modifiedStatesList.find(
                    (c) => c.value === state?.State
                  )}
                />
              )}
              rules={{ required: true }}
            />

            {errors.State && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="City" className="form-label fw-bold">
              City
            </label>
            <Controller
              name="City"
              control={control}
              ref={cityRef}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={citiesList}
                  value={citiesList.find((c) => c.value === value)}
                  onChange={(val) => {
                    onChange(val);
                  }}
                  defaultValue={citiesList.find((c) => c.value === state?.City)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.City && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="PlaceDescription" className="form-label fw-bold">
              Description of Place
            </label>
            <textarea
              {...register("PlaceDescription", { required: true })}
              className="form-control"
              id="PlaceDescription"
              rows="9"
            ></textarea>
            {errors.PlaceDescription && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="Address" className="form-label fw-bold">
              Address
            </label>
            <textarea
              {...register("Address", { required: true })}
              className="form-control"
              id="description"
              rows="9"
            ></textarea>
            {errors.Address && (
              <span className="text-danger">This field is required</span>
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
            {fields.map((item, index) => {
              return (
                <li className="mb-2 mt-2" key={item.id}>
                  <div className="col-md-12 position-relative ">
                    <input
                      {...register(`HotelNearby.${index}.link`, {
                        required: true,
                      })}
                      type="text"
                      className="form-control"
                      id="HotelNearby"
                      defaultValue={item.link}
                    />

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
              );
            })}
            {errors.HotelNearby && (
              <span className="text-danger">This field is required</span>
            )}
          </ul>

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
              disabled
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
          </div>
          <Location lat={30.3165} lng={78.0322} setValue={setValue} />

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

export default UpdateVenue;
