import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import style from "./Events.module.css";
import { fetchVenuesList } from "../../features/actions/venueActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganiserList } from "../../features/actions/organiserActions";
import { fetchCategoriesList } from "../../features/actions/categoryActions";
import { useLocation, useNavigate } from "react-router";
import LoadingButton from "./LoadingButton";
import { Button, Col, Row } from "react-bootstrap";
import { customFieldregex } from "../../utils/regexes";
import { fetchShopsList } from "../../features/actions/shopActions";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import nextIcon from "../../assets/svg/NextIcon.svg";
import previousIcon from "../../assets/svg/PreviousIcon.svg";
import { BsFillSendFill } from "react-icons/bs";
import MultipleImagesUpload from "../../components/common/MultipleImagesUpload";
import styles from "../shops/Shops.module.css";
import { generateDynamicUrl } from "../../utils";
import {
  addNewEvent,
  updateEventDetails,
} from "../../features/actions/eventAction";
import DynamicShopField from "./DynamicShopField";
import { BiEditAlt, BiTrash } from "react-icons/bi";

// ==========================================================================================

const UpdateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const { state } = useLocation();
  console.log("Event-State...", state);

  const [existingData, setExistingData] = useState(state.shopDetails);
  useEffect(() => {
    console.log("ExistingData:::", existingData);
  }, [existingData]);

  const { venueList } = useSelector((state) => state.venue);
  const { organiserList } = useSelector((state) => state.organiser);
  const { categoriesList } = useSelector((state) => state.category);
  const { eventsList, isLoading } = useSelector((state) => state.event);
  const { shopsList } = useSelector((state) => state.shop);

  const ageGroup = [
    { label: "18-23", value: "18-23" },
    { label: "24-35", value: "24-35" },
    { label: "35-60", value: "35-60" },
    { label: "60 and above", value: "60 and above" },
  ];

  const cycle = [
    { label: "1 Year", value: "1" },
    { label: "2 Year", value: "2" },
    { label: "3 Year", value: "4" },
    { label: "5 Year", value: "5" },
  ];

  const [previousShopDetails, setPreviousShopDetails] = useState([]);

  useEffect(() => {
    const temp = state?.shopDetails?.map((item) => {
      return {
        ...item,
        shopName: { label: item.shopName?.shopName, value: item.shopName?._id },
      };
    });
    // console.log(temp);
    setPreviousShopDetails(temp);
  }, [state]);

  const [updateShopDetails, setUpdateShopDetails] = useState(
    state?.shopDetails
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: state?.eventName,
      isPopular: state?.isPopular,
      from: new Date(`${state?.eventDate[0]}`).toISOString().split("T")[0],
      to: new Date(`${state?.eventDate[1]}`).toISOString().split("T")[0],
      description: state?.description,
      rules: state?.rules,
      termsConditions: state?.termsConditions,
      attendReason: state?.attendReason,
      website: state?.website,
      venue: {
        label: state?.venue?.PlaceName,
        value: state?.venue?._id,
      },
      organiser: state?.organiser?.map((item) => {
        return {
          label: item?.companyName,
          value: item?._id,
        };
      }),
      category: state?.category?.map((item) => {
        return {
          label: item?.category,
          value: item?._id,
        };
      }),
      ageGroup: state?.ageGroup?.map((item) => {
        return {
          label: item,
          value: item,
        };
      }),
      cycle: cycle?.find((item) => item?.label === state?.cycle),
      shopDetails: updateShopDetails?.map((item) => {
        console.log("Item::", item);
        return {
          ...item,
          shopName: {
            label: item.shopName?.shopName,
            value: item.shopName?._id,
          },
          customLabelValue: item?.customLabelValue,
          customLabel: item?.customLabel,
        };
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shopDetails",
  });

  const [newImages, setNewImages] = useState([]);
  const updateExistingImage = (e, key, index, shopIndex) => {
    console.log("shopIndex", shopIndex);
    const imageD = e.target.files[0];
    const file = new File([imageD], imageD.name + "-" + key, {});
    setNewImages((prev) => {
      return [...prev, file];
    });
    const img = URL.createObjectURL(imageD);
    const filterD = updateShopDetails.filter((k) => {
      return k.uniqueKey === key;
    });
    const shopData = filterD.map((im) => {
      const temp = [...im.gallery];
      temp[index] = { path: img };
      // const data = im.gallery.filter((gal,ind) => ind != itm.originalname)
      return {
        ...im,
        gallery: temp,
      };
    });
    setUpdateShopDetails((prev) => {
      const temp2 = [...prev];
      temp2[shopIndex] = shopData[0];
      setValue("shopDetails", temp2);
      return temp2;
    });

    // console.log("filterD::", shopData);
  };
  const [venues, setVenues] = useState([]);
  const [organiser, setOrganiser] = useState([]);
  const [shops, setShops] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeTab, setActiveTab] = useState("eventDetails");

  const [selectedLogo, setSelectedLogo] = useState(state.eventLogo || {});
  const [selectedEventBanner, setSelectedEventBanner] = useState(
    state.eventBanner || {}
  );

  const [selectedPdf, setSelectedPdf] = useState(state?.eventBrochure || []);
  const [shopGalleries, setShopGalleries] = useState([]);

  // This method is used to fetch uploaded shop's gallery images
  const receiveShopImages = (imageData) => {
    // console.log("imageData::: ", imageData);
    const { ind, images, uniqueKeyValue } = imageData;

    const imagesData = [...images];
    const updatedImagesData = imagesData.map((image) => {
      // console.log("SHUBHAM SINGH - image::: ", image);

      return {
        ...image,
        file: new File([image.file], image.file.name + "-" + uniqueKeyValue, {
          // lastModified: new Date(0), // optional - default = now
          // type: "overide/mimetype" // optional - default = ''
        }),
      };
    });
    // console.log("updatedImagesData:::: ", updatedImagesData);
    setShopGalleries([...shopGalleries, ...updatedImagesData]);
  };
  useEffect(() => {
    // console.log("selectedPdf:::: ", selectedPdf);
  }, [selectedPdf]);
  useEffect(() => {
    // console.log("existingData:::: ", existingData);
    // console.log("newImages:::: ", newImages);
  }, [existingData, newImages]);

  useEffect(() => {
    if (eventsList.status) {
      navigate("/events");
    }
  }, [eventsList]);

  const onSubmit = (data) => {
    console.log("PEARL ORGANISATION - CREATE EVENT FORM DATA::: ", data);
    const newShopData = data?.shopDetails?.filter((item) => {
      return existingData.every((exist) => item?.uniqueKey != exist?.uniqueKey);
    });
    console.log("newShopData::", newShopData);

    const { randomString, dynamicUrl } = generateDynamicUrl("event");

    const modifiedEventDate = `${data?.to} / ${data?.from}`;
    const dateArrays = [
      new Date(`${modifiedEventDate?.split("/")?.[0]}`),
      new Date(`${modifiedEventDate?.split("/")?.[1]}`),
    ];
    const modifiedVenue = data?.venue?.value;
    const modifiedAgeGroup = data?.ageGroup?.map((item) => item?.value);
    const modifiedOrganiser = data?.organiser?.map((item) => item?.value);
    const modifiedCategory = data?.category?.map((item) => item?.value);
    const modifiedCycle = data?.cycle?.label;

    const modifiedShopDetails = data?.shopDetails?.map((ele) => {
      return { ...ele, shopName: ele?.shopName?.value };
    });
    console.log("modifiedVenue", modifiedVenue);
    formData.append("eventName", data?.eventName);
    formData.append("isPopular", data?.isPopular);
    formData.append("venue", modifiedVenue);
    formData.append("randomString", randomString);
    formData.append("eventUrl", dynamicUrl);
    formData.append("ageGroup", JSON.stringify(modifiedAgeGroup));
    formData.append("description", data?.description);
    formData.append("attendReason", data?.attendReason);
    formData.append("termsConditions", data?.termsConditions);
    formData.append("rules", data?.rules);
    formData.append("organiser", JSON.stringify(modifiedOrganiser));
    formData.append("website", data?.website);
    formData.append("cycle", modifiedCycle);
    formData.append("eventDate", JSON.stringify(dateArrays));
    formData.append("category", modifiedCategory);

    formData.append("shopDetails", JSON.stringify(existingData));
    formData.append("newShopDetails", JSON.stringify(newShopData));

    Array.from(data?.eventLogo).forEach((photo) => {
      formData.append("eventLogo", photo);
    });

    Array.from(data?.eventBrochure).forEach((pdf) => {
      formData.append("eventBrochure", pdf);
    });

    Array.from(data?.eventBanner).forEach((banner) => {
      formData.append("eventBanner", banner);
    });
    shopGalleries.length > 0 &&
      shopGalleries.forEach((shopFile) => {
        formData.append("shopGalleries", shopFile?.file);
      });
    newImages.forEach((shopImage) => {
      formData.append("shopGalleries", shopImage);
    });
    for (let pair of formData.entries()) {
      // console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(updateEventDetails({ eventId: state?._id, payload: formData }));
  };

  //Upload and Preview Event Logo Image
  const [logoImage, setLogoImage] = useState(null);

  const handleLogoImage = (e) => {
    const img = URL.createObjectURL(e.target?.files?.[0]);
    setLogoImage(img);
  };

  //Upload and Preview Event Banner Image
  const eventBannerImgRef = useRef();
  const [eventBannerImg, setEventBannerImg] = useState("");

  useEffect(() => {
    dispatch(fetchVenuesList());
    dispatch(fetchOrganiserList());
    dispatch(fetchCategoriesList());
    dispatch(fetchShopsList());
    if (venueList?.length > 0) {
      setVenues([]);
      venueList?.map((item) => {
        setVenues((prev) => {
          return [...prev, { value: item._id, label: item.PlaceName }];
        });
      });
    }
    if (organiserList?.length > 0) {
      setOrganiser([]);
      organiserList?.map((item) => {
        setOrganiser((prev) => {
          return [...prev, { value: item._id, label: item.companyName }];
        });
      });
    }

    if (categoriesList?.length > 0) {
      setCategory([]);
      categoriesList?.map((item) => {
        setCategory((prev) => {
          return [...prev, { value: item._id, label: item.category }];
        });
      });
    }

    if (shopsList?.length > 0) {
      setShops([]);
      shopsList?.map((item) => {
        setShops((prev) => {
          return [...prev, { value: item._id, label: item.shopName }];
        });
      });
    }
  }, []);

  //handle edit image
  const handleImage = (files) => {
    // console.log(files[0]);
    const image = window.URL.createObjectURL(files[0]);

    setSelectedLogo((prev) => {
      return { path: image };
    });
  };

  const handleEventBrochure = (files) => {
    // console.log(files[0]);
    const pdf = window.URL.createObjectURL(files[0]);

    setSelectedPdf((prev) => {
      return [{ originalname: files[0]?.name, path: pdf }];
    });
  };

  const handleEventBanner = (files) => {
    // console.log(files[0]);
    const image = window.URL.createObjectURL(files[0]);

    setSelectedEventBanner((prev) => {
      return { path: image };
    });
  };
  // This block of code is used to show image preview after uploading shop's logo.
  useEffect(() => {
    const imageData = watch("eventImages")?.[0];
    const url = imageData ? window.URL.createObjectURL(imageData) : "";
    setEventBannerImg(url);
  }, [watch("eventImages")]);

  return (
    <>
      <div style={{ paddingBottom: "5rem" }} className="container">
        <Row>
          <Col className="p-0">
            <h2
              className={`text-center text-danger mb-3 py-2 ${styles.addEventTitle}`}
            >
              Update Event's Details
            </h2>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)} className="mb-2">
          <Tabs
            id="controlled-tab-example"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-3"
          >
            <Tab
              eventKey="eventDetails"
              title="Event's Basic Details"
              className="bg-white"
            >
              <Row className="border border-secondary px-2 py-2 ">
                <div className="col-md-4 my-2">
                  <label htmlFor="eventName" className="form-label fw-bold">
                    Name of Event
                  </label>
                  <input
                    {...register("eventName", {
                      required: true,
                      pattern: {
                        value: customFieldregex,
                        message: "Event Name is invalid",
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="eventName"
                  />
                  {errors.eventName && (
                    <span className="text-danger">
                      Name of Event is required
                    </span>
                  )}
                </div>
                <div className="col-md-4 my-2">
                  <label htmlFor="venue" className="form-label fw-bold">
                    Venue
                  </label>
                  <Controller
                    name="venue"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={venues}
                        value={value || null}
                        onChange={(val) => onChange(val)}
                      />
                    )}
                    rules={{ required: true }}
                  />

                  {errors.venue && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
                <div className="col-md-4 my-2">
                  <label htmlFor="Category" className="form-label fw-bold">
                    Industry Category
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={category}
                        value={value || null}
                        onChange={(val) => onChange(val)}
                        isMulti
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.category && (
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
                        onChange={(val) => onChange(val)}
                        isMulti
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.ageGroup && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="row p-0 m-0">
                  <div className="col-md-6 my-2">
                    <label htmlFor="organizer" className="form-label fw-bold">
                      Organiser
                    </label>
                    <Controller
                      name="organiser"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          options={organiser}
                          defaultValue={organiserList}
                          value={value || null}
                          onChange={(val) => onChange(val)}
                          isMulti
                        />
                      )}
                      rules={{ required: true }}
                    />

                    {errors.organiser && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-6 my-2">
                  <label htmlFor="Description" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="form-control"
                    id="description"
                    rows="6"
                  ></textarea>
                  {errors.description && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="col-md-6 my-2">
                  <label htmlFor="attendReason" className="form-label fw-bold">
                    Why you should attend this?
                  </label>
                  <textarea
                    {...register("attendReason")}
                    className="form-control"
                    id="attendReason"
                    rows="6"
                  ></textarea>
                  {errors.attendReason && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="col-md-6 my-2">
                  <label
                    htmlFor="termsConditions"
                    className="form-label fw-bold"
                  >
                    Terms and condition
                  </label>
                  <textarea
                    {...register("termsConditions")}
                    className="form-control"
                    id="termsConditions"
                    rows="6"
                  ></textarea>
                  {errors.termsConditions && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="col-md-6 my-2">
                  <label htmlFor="Rules" className="form-label fw-bold">
                    Rules & Regulation / Safety
                  </label>
                  <textarea
                    {...register("rules")}
                    className="form-control"
                    id="rules"
                    rows="6"
                  ></textarea>
                  {errors.rules && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="col-md-3 my-2">
                  <label htmlFor="cycle" className="form-label fw-bold">
                    Cycle
                  </label>
                  <Controller
                    name="cycle"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={cycle}
                        value={value || null}
                        onChange={(val) => onChange(val)}
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.cycle && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>

                <div className="col-md-3 my-2">
                  <label htmlFor="website" className="form-label fw-bold">
                    Event Website
                  </label>
                  <input
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/,
                        message: "Invalid website URL",
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="website"
                  />
                  {errors.website && (
                    <span className="text-danger">
                      {errors.website?.message}
                    </span>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="position-relative my-2">
                      {/* {logoImage && showImage && (
                        <div className={style.logoImage}>
                          <img className="" src={selectedLogo?.path} alt="logo" />logo
                        </div>
                      )} */}
                      <label
                        htmlFor="eventLogo"
                        className="form-label fw-bold d-flex gap-2 justify-content-start align-items-center"
                      >
                        Event Logo
                        <BsFillPenFill style={{ cursor: "pointer" }} />
                      </label>
                      <input
                        {...register("eventLogo", {
                          onChange: (event) => handleImage(event.target.files),
                          required: {
                            value: false, // true,
                            message: "Please upload event logo.",
                          },
                          validate: {
                            lessThan2MB: (files) => {
                              const { isDirty } = getFieldState("eventLogo");
                              return isDirty
                                ? files[0]?.size < 2000000 ||
                                    "Only 2 MB size is allowed"
                                : true;
                            },
                            acceptedFormats: (files) => {
                              const { isDirty } = getFieldState("eventLogo");
                              return isDirty
                                ? [
                                    "image/png",
                                    "image/jpeg",
                                    "image/jpg",
                                  ].includes(files[0]?.type) ||
                                    "Only (png,jpeg and jpg) format is allowed"
                                : true;
                            },
                          },
                        })}
                        type="file"
                        className="form-control d-none"
                        id="eventLogo"
                        // onChange={handleLogoImage}
                      />
                      <img
                        width={120}
                        height={120}
                        className=""
                        src={selectedLogo?.path}
                        alt="eventLogo"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="position-relative my-2">
                      <label
                        htmlFor="eventBanner"
                        className="form-label fw-bold d-flex gap-2 justify-content-start align-items-center"
                      >
                        Event Banner
                        <BsFillPenFill style={{ cursor: "pointer" }} />
                      </label>
                      <input
                        {...register("eventBanner", {
                          onChange: (event) =>
                            handleEventBanner(event.target.files),
                          required: {
                            value: false,
                            message: "Please upload event logo.",
                          },
                          validate: {
                            lessThan2MB: (files) => {
                              const { isDirty } = getFieldState("eventBanner");
                              return isDirty
                                ? files[0]?.size < 2000000 ||
                                    "Only 2 MB size is allowed"
                                : true;
                            },
                            acceptedFormats: (files) => {
                              const { isDirty } = getFieldState("eventBanner");
                              return isDirty
                                ? [
                                    "image/png",
                                    "image/jpeg",
                                    "image/jpg",
                                  ].includes(files[0]?.type) ||
                                    "Only (png,jpeg and jpg) format is allowed"
                                : true;
                            },
                          },
                        })}
                        type="file"
                        className="form-control d-none"
                        id="eventBanner"
                      />
                      <img
                        width={120}
                        height={120}
                        className=""
                        src={selectedEventBanner?.path}
                        alt="eventBanner"
                      />
                      <div>
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.eventBanner?.message}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="my-2">
                      <label
                        htmlFor="eventBrochure"
                        className="form-label fw-bold"
                      >
                        Event Brochure{" "}
                        <BsFillPenFill style={{ cursor: "pointer" }} />
                      </label>

                      {Array.isArray(selectedPdf) && selectedPdf.length > 0 ? (
                        <div className="">
                          <embed
                            src={selectedPdf[0]?.path || "N.A"}
                            width="400"
                            height="400"
                            className="m-3 "
                            title={selectedPdf[0]?.originalname}
                          />
                        </div>
                      ) : (
                        "N.A"
                      )}
                      <input
                        {...register("eventBrochure", {
                          onChange: (event) =>
                            handleEventBrochure(event.target.files, 0),
                          required: {
                            value: false, // true,
                            message: "Please upload shop document",
                          },
                          validate: {
                            lessThan2MB: (files) => {
                              const { isDirty } =
                                getFieldState("eventBrochure");
                              return isDirty
                                ? files[0]?.size < 2000000 ||
                                    "Only 2 MB size is allowed"
                                : true;
                            },
                            acceptedFormats: (files) => {
                              const { isDirty } =
                                getFieldState("eventBrochure");
                              return isDirty
                                ? ["application/pdf"].includes(
                                    files[0]?.type
                                  ) || "Only PDF is allowed"
                                : true;
                            },
                          },
                        })}
                        type="file"
                        className="form-control d-none"
                        id="eventBrochure"
                        accept="application/pdf"
                      />
                      {errors.eventBrochure && (
                        <span className="text-danger">
                          {errors.eventBrochure.message ||
                            "Event Brochure is required"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-8 mb-3">
                  {eventBannerImg && (
                    <img
                      className="my-2"
                      style={{ cursor: "pointer" }}
                      src={eventBannerImg || ""}
                      alt="shop logo"
                      width="100%"
                      height="300"
                      ref={eventBannerImgRef}
                    />
                  )}
                </div>
                <div className="col-md-12 my-2">
                  <div class="form-check">
                    <input
                      {...register("isPopular")}
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check-label fw-bold"
                      for="flexCheckDefault"
                    >
                      Is Event Popular
                    </label>
                  </div>
                  {errors.isPopular && (
                    <span className="text-danger">
                      {errors.website?.message || "This Field is Required"}
                    </span>
                  )}
                </div>
                <Col sm={12} md={12} className="text-center mb-2">
                  <Button
                    variant="success"
                    onClick={() => setActiveTab("shopDetails")}
                    // disabled={!isFirstStepValid}
                  >
                    Next &nbsp; <img src={nextIcon} alt="next-icon" />
                  </Button>
                </Col>
              </Row>
            </Tab>
            <Tab
              eventKey="shopDetails"
              title="Add Shop's Details"
              className="bg-white"
            >
              <Row className="border border-secondary px-2 py-2 ">
                <Col className="text-center" sm={12} md={12}>
                  <label className={styles.keyPersonDetails}>
                    Add Shop's Details
                  </label>
                  <button
                    className="btn btn-primary float-end"
                    type="button"
                    onClick={() =>
                      append({
                        shopName: "",
                        hallNumber: "",
                        customLabel: {},
                        customLabelValue: "",
                        uniqueKey: generateDynamicUrl().randomString,
                      })
                    }
                  >
                    <AiOutlinePlus
                      style={{
                        height: "25px",
                        width: "25px",
                      }}
                    />
                  </button>
                </Col>

                {fields.map((field, index) => {
                  // console.log("index::::::: ", index);
                  return (
                    <div className="row p-3 my-3" key={field.id}>
                      <Form.Group className="mb-3" controlId="shopName">
                        <Form.Label>Select Shop Name</Form.Label>
                        <Controller
                          name={`shopDetails.${index}.shopName`}
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <Select
                              options={shops}
                              value={value || null}
                              onChange={(val) => onChange(val)}
                              defaultValue={{
                                value: "chocolate",
                                label: "Chocolate",
                              }}
                            />
                          )}
                          rules={{
                            required: {
                              message: "Shop is required",
                              value: true,
                            },
                          }}
                        />
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.shopDetails?.[index]?.shopName?.message}
                        </span>
                      </Form.Group>
                      <Col sm={12} md={6}>
                        <Form.Group className="mb-3" controlId="hallNumber">
                          <Form.Label>Hall Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Hall Number"
                            {...register(`shopDetails.${index}.hallNumber`, {
                              required: {
                                value: true,
                                message: "Hall Number is required",
                              },
                              pattern: {
                                value: customFieldregex,
                                message: "Hall Number is invalid",
                              },
                              minLength: {
                                value: 1,
                                message:
                                  "Hall Number cannot be less than 1 character.",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Hall Number cannot be more than 50 characters.",
                              },
                            })}
                          />
                          <span className="fw-normal fs-6 text-danger">
                            {errors?.shopDetails?.[index]?.hallNumber?.message}
                          </span>
                        </Form.Group>
                      </Col>

                      <DynamicShopField
                        index={index}
                        control={control}
                        errors={errors}
                        register={register}
                      />

                      <Col
                        sm={12}
                        md={12}
                        className="d-flex justify-content-center"
                        style={{ height: "auto" }}
                      >
                        <div
                          style={{ display: "grid", placeItems: "center" }}
                          className=""
                        >
                          <div>
                            <label className="fw-bold text-center p-2 w-100">
                              Please Upload Shop's Gallery Images
                            </label>
                            <MultipleImagesUpload
                              sendImagesToShop={receiveShopImages}
                              ind={index}
                              uniqueKeyValue={field?.uniqueKey}
                            />
                          </div>
                          <label className="fw-bold text-center p-2 w-100">
                            Existing Media
                          </label>
                          <div className="d-flex">
                            {field.gallery &&
                              field.gallery?.map((itm, im) => {
                                return (
                                  <div className=" mx-2 p-2">
                                    <img
                                      className=""
                                      src={itm.path}
                                      alt="gallery"
                                      width={200}
                                      height={200}
                                    />
                                    <div className="d-flex justify-content-center pt-2">
                                      <label
                                        onClick={(e) => {
                                          // console.log(state.shopDetails)
                                          const filteredData =
                                            state?.shopDetails
                                              ?.filter(
                                                (item) =>
                                                  item.uniqueKey ===
                                                  field?.uniqueKey
                                              )
                                              .map((im) => {
                                                const data = im.gallery.filter(
                                                  (gal) => gal.path != itm.path
                                                );
                                                return {
                                                  ...im,
                                                  gallery: data,
                                                };
                                              });
                                          setExistingData((prev) => {
                                            const temp = [...prev];
                                            const temp2 = filteredData.find(
                                              (item) =>
                                                item.uniqueKey ===
                                                field?.uniqueKey
                                            );
                                            temp[index] = temp2;
                                            return temp;
                                          });
                                          // console.log("FilteredData::",filteredData)
                                          // console.log(
                                          //   {key:field?.uniqueKey,originalName:itm.originalname,index:index}
                                          // );
                                        }}
                                        htmlFor={`website-${index}-${im}`}
                                        className="form-label fw-bold btn  btn-warning"
                                      >
                                        <BiEditAlt />
                                      </label>
                                      <input
                                        onChange={(e) => {
                                          updateExistingImage(
                                            e,
                                            field?.uniqueKey,
                                            im,
                                            index
                                          );
                                        }}
                                        type="file"
                                        className="form-control d-none"
                                        id={`website-${index}-${im}`}
                                      />

                                      {/* <button
                                        type="button"
                                        className="btn  btn-danger"
                                      >
                                        <BiTrash />
                                      </button> */}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </Col>
                      <div className="col-md-12 d-flex align-items-center justify-content-center mt-2">
                        <div className="form-row">
                          {fields.length > 1 && (
                            <button
                              className="btn btn-outline-danger"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Delete Shop
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Col sm={12} md={12} className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab("eventDetails")}
                    className="me-2"
                  >
                    Previous &nbsp; <img src={previousIcon} alt="next-icon" />
                  </Button>
                  {isLoading ? (
                    <LoadingButton />
                  ) : (
                    <Button
                      variant="success"
                      type="submit"
                      // disabled={!isFirstStepValid || !isSecondStepValid}
                    >
                      Submit &nbsp;
                      <BsFillSendFill />
                    </Button>
                  )}
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Form>
      </div>
    </>
  );
};

export default UpdateEvent;
