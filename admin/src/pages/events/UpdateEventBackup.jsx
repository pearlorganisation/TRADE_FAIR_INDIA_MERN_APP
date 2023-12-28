import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import UploadImage from "../../assets/images/UploadBanner.png";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { AiOutlineEye } from "react-icons/ai";
import style from "./Events.module.css";
import { fetchVenuesList } from "../../features/actions/venueActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganiserList } from "../../features/actions/organiserActions";
import {
  addNewEvent,
  updateEventDetails,
} from "../../features/actions/eventAction";
import { fetchCategoriesList } from "../../features/actions/categoryActions";
import { useLocation } from "react-router";
import moment from "moment";

const UpdateEvent = () => {
  const { venueList } = useSelector((state) => state.venue);
  const { organiserList } = useSelector((state) => state.organiser);
  const { categoriesList } = useSelector((state) => state.category);
  const { state } = useLocation();
  const eventLogoRef = useRef();
  const eventPdf = useRef();
  const eventBannerRef = useRef();

  const [venues, setVenues] = useState([]);
  const [organiser, setOrganiser] = useState([]);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVenuesList());
    dispatch(fetchOrganiserList());
    dispatch(fetchCategoriesList());
    if (venueList?.data?.length > 0) {
      venueList?.data?.map((item) => {
        setVenues((prev) => {
          return [...prev, { value: item._id, label: item.PlaceName }];
        });
      });
    }
    if (organiserList?.length > 0) {
      organiserList?.map((item) => {
        setOrganiser((prev) => {
          return [...prev, { value: item._id, label: item.companyName }];
        });
      });
    }

    if (categoriesList?.length > 0) {
      categoriesList?.map((item) => {
        setCategory((prev) => {
          return [...prev, { value: item._id, label: item.category }];
        });
      });
    }
  }, []);

  const ageGroup = [
    { label: "18-23", value: "18-23" },
    { label: "24-35", value: "24-35" },
    { label: "35-60", value: "35-60" },
    { label: "60 and above", value: "60 and above" },
  ];
  const cycle = [
    { label: "1 Year", value: "1 Year" },
    { label: "2 Year", value: "2 Year" },
    { label: "3 Year", value: "3 Year" },
    { label: "5 Year", value: "5 Year" },
  ];
  const formData = new FormData();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      EventName: state.EventName,
      from: new Date(state?.EventDate[1]).toJSON().slice(0, 10),
      to: new Date(state?.EventDate[0]).toJSON().slice(0, 10),
      Discription: state.Discription,
      eventLogo: state?.eventLogo[0]?.path,
      eventPdf: state?.eventPdf[0]?.path,
      eventImages: state?.eventImages[0]?.path,
      attendReason: state?.attendReason,
      TermsConditions: state?.TermsConditions,
      Rules: state?.Rules,
      Venue: {
        label: state?.Venue?.PlaceName,
        value: state?.Venue?.__id,
      },
      Organiser: state?.Organiser?.map((item) => {
        return {
          label: item?.companyName,
          value: item?._id,
        };
      }),
      Location: state.Location,
      website: state.website,
      ageGroup: ageGroup.find((item) => item.value === state.ageGroup),
      Cycle: cycle.find((item) => item.value === state.Cycle),
    },
  });

  const handleUpdateEvent = (data) => {
    const modifiedEventDate = `${data.to} / ${data.from}`;
    const modifiedVenue = data.Venue.value;
    const modifiedAgeGroup = data.ageGroup.value;
    const modifiedOrganiser = data.Organiser.map((item) => item.value);
    const modifiedCategory = data.Category.map((item) => item.value);
    const modifiedCycle = data.Cycle.label;
    formData.append("EventName", data.EventName);
    formData.append("Venue", modifiedVenue);
    formData.append("ageGroup", modifiedAgeGroup);
    formData.append("Discription", data.Discription);
    formData.append("attendReason", data.attendReason);
    formData.append("TermsConditions", data.TermsConditions);
    formData.append("Rules", data.Rules);

    Array.from(data.eventImages).forEach((photo) => {
      formData.append("eventImages", photo);
    });

    Array.from(data.files).forEach((pdf) => {
      formData.append("files", pdf);
    });
    formData.append("Organiser", modifiedOrganiser);
    formData.append("website", data.website);
    formData.append("Cycle", modifiedCycle);
    formData.append("EventDate", modifiedEventDate);

    Array.from(data.eventLogo).forEach((photo) => {
      formData.append("eventLogo", photo);
    });

    formData.append("Location", data.Location);
    formData.append("Category", modifiedCategory);
    dispatch(updateEventDetails({ payload: formData, eventId: state?._id }));
  };

  //This is for update and preview Event Logo Images
  const [logoImage, setLogoImage] = useState();
  const [logoImgFile, setLogoImgFile] = useState();

  const handleLogoImage = () => {
    eventLogoRef.current.click();
  };

  const handleEventLogo = (e) => {
    const file = e.target?.files[0];
    setLogoImage(URL.createObjectURL(file));
    setLogoImgFile(file);
  };

  useEffect(() => {
    setLogoImage(state?.eventLogo[0]?.path);
  }, []);

  //This is for update and preview Event Banner Images

  const [bannerImage, setBannerImage] = useState();
  const [bannerImageFile, setBannerImageFile] = useState();

  const handleBannerImage = () => {
    eventBannerRef.current.click();
  };

  const handleBannerImageFile = (e) => {
    const file = e.target?.files[0];
    setBannerImage(URL.createObjectURL(file));
    setBannerImageFile(file);
  };

  useEffect(() => {
    setBannerImage(state?.eventImages[0]?.path);
  }, []);

  //This is for update and preview pdf
  const [pdfView, setPdfView] = useState();
  const [pdfViewFile, setPdfViewFile] = useState();

  const handleEditPdf = () => {
    eventPdf.current.click();
  };

  const handlePdf = (e) => {
    const file = e.target?.files[0];
    setPdfView(URL.createObjectURL(file));
    setPdfViewFile(file);
  };

  useEffect(() => {
    setPdfView(state?.eventPdf[0]?.path);
  }, []);

  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium mb-2 py-2 w-100 text-center"
            style={{ background: "#dee2e6" }}
          >
            Update Event
          </div>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdateEvent)}
          className="row bg-light py-2"
        >
          <div className="col-md-4 my-2">
            <label htmlFor=" EventName" className="form-label fw-bold">
              Name of Event
            </label>
            <input
              {...register("EventName", { required: true })}
              type="text"
              className="form-control"
              id="EventName"
            />
            {errors.EventName && (
              <span className="text-danger">Name of Event is required</span>
            )}
          </div>
          <div className="col-md-4 my-2">
            <label htmlFor="Venue" className="form-label fw-bold">
              Venue
            </label>
            <Controller
              name="Venue"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={venues}
                  value={value || null}
                  // value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val)}
                  // getOptionLabel={(e)=>e.label}
                  // getOptionValue={(e)=>e.value}
                  // closeMenuOnSelect={true}
                />
              )}
              rules={{ required: true }}
            />

            {errors.Venue && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="col-md-4 my-2">
            <label htmlFor="Category" className="form-label fw-bold">
              Industry Category
            </label>
            <Controller
              name="Category"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={category}
                  value={value || null}
                  // value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val)}
                  isMulti
                />
              )}
              rules={{ required: true }}
            />
            {errors.Category && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-4 my-2">
            <label htmlFor="from" className="form-label fw-bold">
              From
            </label>
            <input
              {...register("from", { required: true })}
              type="date"
              className="form-control"
              id="from"
              placeholder="Apartment, studio, or floor"
            />
            {errors.from && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-4 my-2">
            <label htmlFor="to" className="form-label fw-bold">
              To
            </label>
            <input
              {...register("to", { required: true })}
              type="date"
              className="form-control"
              id="to"
              placeholder="1234 Main St"
            />
            {errors.to && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-4 my-2">
            <label htmlFor="ageGroup" className="form-label fw-bold">
              Age Group
            </label>
            <Controller
              name="ageGroup"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={ageGroup}
                  value={value || null}
                  // value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.ageGroup && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 position-relative my-2">
            <div className="d-flex">
              <label
                htmlFor=""
                className="form-label fw-bold d-flex justify-content-between align-items-center"
              >
                <span>Event Logo</span>
              </label>
              <div
                className="btn btn-outline-info m-2"
                onClick={() => handleLogoImage()}
              >
                Edit
              </div>
            </div>
            <div className="w-100 h-100">
              <img
                src={logoImage}
                alt="logo"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
            <input
              {...register("eventLogo")}
              onChange={(event) => {
                handleEventLogo(event);
              }}
              ref={eventLogoRef}
              type="file"
              id="eventLogo"
              className="form-control"
              style={{ display: "none" }}
            />
            {errors.eventLogo && (
              <span className="text-danger">
                {errors.eventLogo.message || "Event Logo is required"}
              </span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="eventPdf" className="form-label fw-bold">
              Event Brochure
            </label>
            <div
              className="btn btn-outline-info m-2"
              onClick={() => handleEditPdf()}
            >
              Edit
            </div>

            <input
              {...register("eventPdf", {
                required: true,
                validate: {
                  lessThan2MB: (files) =>
                    files[0]?.size < 2000000 || "Only 2 MB size is allowed",
                  acceptedFormats: (files) =>
                    ["application/pdf"].includes(files[0]?.type) ||
                    "Only PDF is allowed",
                },
              })}
              type="file"
              className="form-control"
              ref={eventPdf}
              id="eventPdf"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={(event) => {
                handlePdf(event);
              }}
            />
            <div>
              <embed
                src={pdfView || "N.A"}
                width="200"
                height="200"
                className="m-3"
                // title={}
              />
            </div>
            {errors.files && (
              <span className="text-danger">
                {errors.files.message || "Event Broucher is required"}
              </span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="Discription" className="form-label fw-bold">
              Description
            </label>
            <textarea
              {...register("Discription", { required: true })}
              className="form-control"
              id="Discription"
              rows="6"
            ></textarea>
            {errors.Discription && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="attendReason" className="form-label fw-bold">
              Why you should attend this?
            </label>
            <textarea
              {...register("attendReason", { required: true })}
              className="form-control"
              id="attendReason"
              rows="6"
            ></textarea>
            {errors.attendReason && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="TermsConditions" className="form-label fw-bold">
              Terms and condition
            </label>
            <textarea
              {...register("TermsConditions", { required: true })}
              className="form-control"
              id="TermsConditions"
              rows="6"
            ></textarea>
            {errors.TermsConditions && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="Rules" className="form-label fw-bold">
              Rlules & Regulation / Safety
            </label>
            <textarea
              {...register("Rules", { required: true })}
              className="form-control"
              id="Rules"
              rows="6"
            ></textarea>
            {errors.Rules && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          {/* <div className="col-md-6">
            <label htmlFor="Location" className="form-label fw-bold">
              Location of Event
            </label>

            <input
              {...register("Location", { required: true })}
              type="text"
              className="form-control"
              id="Location"
            />
            {errors.Location && (
              <span className="text-danger">This field is required</span>
            )}
          </div> */}

          <div className="col-md-6 my-2">
            <label htmlFor="cycle" className="form-label fw-bold">
              Cycle
            </label>
            <Controller
              name="Cycle"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={cycle}
                  value={value || null}
                  // value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val)}
                />
              )}
              rules={{ required: true }}
            />
            {errors.Cycle && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="organizer" className="form-label fw-bold">
              Organiser
            </label>
            <Controller
              name="Organiser"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  options={organiser}
                  value={value || null}
                  // value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val)}
                  isMulti
                />
              )}
              rules={{ required: true }}
            />
            {/* <Select
              {...register("organizer", { required: true })}
              // defaultValue={["Abhishek ", 'Abhishek']}
              isMulti
              id="organizer"
              name="organizer"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
            /> */}
            {errors.Organiser && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-md-6 my-2">
            <label htmlFor="website" className="form-label fw-bold">
              Event Website
            </label>
            <input
              {...register("website", { required: true })}
              type="text"
              className="form-control"
              id="website"
            />
            {errors.website && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="col-12 my-2">
            <label htmlFor="inputState" className="form-label fw-bold">
              Event Banner
            </label>
            <div
              className="btn btn-outline-info m-2"
              onClick={() => handleBannerImage()}
            >
              Edit
            </div>
            <div className="w-100 h-100">
              <img
                src={bannerImage}
                className="rounded-2"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
                alt="..."
              ></img>
            </div>
            <input
              {...register("eventImages")}
              onChange={(event) => {
                handleBannerImageFile(event);
              }}
              ref={eventBannerRef}
              type="file"
              id="eventImages"
              name="eventImages"
              style={{ display: "none" }}
            />
            {errors.eventImages && (
              <span className="text-danger">
                {errors.eventImages.message || "Image is required"}
              </span>
            )}
          </div>

          <div className="col-12 d-flex justify-content-end align-items-end mt-2">
            <button
              type="submit"
              className="btn btn-primary w-25 py-2 fw-medium fs-6"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEvent;
