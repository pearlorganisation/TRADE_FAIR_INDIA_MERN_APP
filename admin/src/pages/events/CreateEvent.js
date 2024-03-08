import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import style from "./Events.module.css";
import { fetchVenuesList } from "../../features/actions/venueActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrganiserList } from "../../features/actions/organiserActions";
import { fetchCategoriesList } from "../../features/actions/categoryActions";
import { useNavigate } from "react-router";
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
import { addNewEvent } from "../../features/actions/eventAction";
import DynamicShopField from "./DynamicShopField";

// ==========================================================================================

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const { venueList } = useSelector((state) => state.venue);
  const { organiserList } = useSelector((state) => state.organiser);
  const { categoriesList } = useSelector((state) => state.category);
  const { eventsList, isLoading } = useSelector((state) => state.event);
  const { shopsList } = useSelector((state) => state.shop);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      shopDetails: [
        {
          shopName: "",
          hallNumber: "",
          customLabel: {},
          customLabelValue: "",
          uniqueKey: generateDynamicUrl().randomString,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shopDetails",
  });

  const [venues, setVenues] = useState([]);
  const [organiser, setOrganiser] = useState([]);
  const [shops, setShops] = useState([]);
  const [category, setCategory] = useState([]);
  const [activeTab, setActiveTab] = useState("eventDetails");
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const [isSecondStepValid, setIsSecondStepValid] = useState(false);
  const [shopGalleries, setShopGalleries] = useState([]);

  // This method is used to fetch uploaded shop's gallery images
  const receiveShopImages = (imageData) => {
    console.log("imageData::: ", imageData);
    const { ind, images, uniqueKeyValue } = imageData;

    const imagesData = [...images];
    const updatedImagesData = imagesData.map((image) => {
      console.log("SHUBHAM SINGH - image::: ", image);

      return {
        ...image,
        file: new File([image.file], image.file.name + "-" + uniqueKeyValue, {
          // lastModified: new Date(0), // optional - default = now
          // type: "overide/mimetype" // optional - default = ''
        }),
      };
    });
    console.log("updatedImagesData:::: ", updatedImagesData);
    setShopGalleries([...shopGalleries, ...updatedImagesData]);
  };

  useEffect(() => {
    console.log("shopGalleries:::: ", shopGalleries);
  }, [shopGalleries]);

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

  useEffect(() => {
    if (eventsList.status) {
      navigate("/events");
    }
  }, [eventsList]);

  const onSubmit = (data) => {
    console.log("PEARL ORGANISATION - CREATE EVENT FORM DATA::: ", data);
    console.log(
      "PEARL ORGANISATION - CREATE EVENT GALLERY DATA::: ",
      shopGalleries
    );

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
    formData.append("shopDetails", JSON.stringify(modifiedShopDetails));

    Array.from(data?.eventLogo).forEach((photo) => {
      formData.append("eventLogo", photo);
    });

    Array.from(data?.eventBrochure).forEach((pdf) => {
      formData.append("eventBrochure", pdf);
    });

    Array.from(data?.eventBanner).forEach((banner) => {
      formData.append("eventBanner", banner);
    });

    shopGalleries.forEach((shopFile) => {
      formData.append("shopGalleries", shopFile?.file);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    // console.log("data::",data)
    dispatch(addNewEvent(formData));
  };

  //Upload and Preview Event Logo Image
  const [logoImage, setLogoImage] = useState(null);
  const [showImage, setshowImage] = useState(false);

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

  // This block of code is used to show image preview after uploading shop's logo.
  useEffect(() => {
    const imageData = watch("eventBanner")?.[0];
    const url = imageData ? window.URL.createObjectURL(imageData) : "";
    setEventBannerImg(url);
  }, [watch("eventBanner")]);

  return (
    <>
      <div style={{ paddingBottom: "5rem" }} className="container">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium mb-2 py-2 w-100 text-center"
            style={{ background: "#dee2e6" }}
          >
            Add New Event
          </div>
        </div>
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
                  <div className="col-md-3">
                    <div className="position-relative my-2">
                      {logoImage && showImage && (
                        <div className={style.logoImage}>
                          <img className="" src={logoImage} alt="logo" />
                        </div>
                      )}
                      <label
                        htmlFor=""
                        className="form-label fw-bold d-flex justify-content-between align-items-center"
                      >
                        <span>Event Logo</span>{" "}
                        <AiOutlineEye
                          onClick={() => {
                            setshowImage(!showImage);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                      <input
                        {...register("eventLogo", {
                          required: true,
                          validate: (value) => {
                            return value?.[0]?.size <= 2000000
                              ? ![
                                  "image/png",
                                  "image/jpeg",
                                  "image/jpg",
                                ].includes(value?.[0].type)
                                ? "We accept only png, jpeg,   jpg format"
                                : true
                              : "Image size should be maximum 2mb";
                          },
                        })}
                        type="file"
                        className="form-control"
                        id="eventLogo"
                        onChange={handleLogoImage}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="my-2">
                      <label
                        htmlFor="eventBrochure"
                        className="form-label fw-bold"
                      >
                        Event Brochure
                      </label>
                      <input
                        {...register("eventBrochure", {
                          required: true,
                          validate: (value) => {
                            return value?.[0]?.size <= 2000000
                              ? !["application/pdf"].includes(value?.[0].type)
                                ? "We accept only pdf, docs, xls format"
                                : true
                              : "Image size should be maximum 2mb";
                          },
                        })}
                        type="file"
                        className="form-control"
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
                  {errors.Rules && (
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

                <div className="col-md-6 my-2">
                  <Form.Group className="" controlId="eventBanner">
                    <label htmlFor="website" className="form-label fw-bold">
                      Event Banner (1536 X 416)
                    </label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      placeholder="Upload Shop's Banner"
                      {...register("eventBanner", {
                        required: {
                          value: true,
                          message: "Please upload Event banner",
                        },
                        validate: {
                          lessThan2MB: (files) =>
                            files?.[0]?.size < 2000000 ||
                            "Only 2 MB size is allowed",
                          acceptedFormats: (files) =>
                            !["image/png, image/jpg, image/jpeg"].includes(
                              files?.[0]?.type
                            ) || "Only image is allowed",
                        },
                      })}
                    />
                    <div>
                      <span className="fw-normal fs-6 text-danger">
                        {errors?.eventBanner?.message}
                      </span>
                    </div>
                  </Form.Group>
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
                <div className="col-md-12 mb-3">
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
                  return (
                    <div className="row m-2 p-2 w-100 border" key={index}>
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
                        <div>
                          <label className="fw-bold text-center">
                            Please Upload Shop's Gallery Images
                          </label>
                          <MultipleImagesUpload
                            sendImagesToShop={receiveShopImages}
                            ind={index}
                            uniqueKeyValue={field?.uniqueKey}
                          />
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

export default CreateEvent;
