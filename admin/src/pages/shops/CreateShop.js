import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Shops.module.css";
import Button from "react-bootstrap/Button";
import { generateDynamicUrl } from "../../utils";
import Form from "react-bootstrap/Form";
import {
  customFieldregex,
  emailRegex,
  indianMobileRegex,
  websiteRegex,
} from "../../utils/regexes";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { City } from "country-state-city";
import moment from "moment";
import { fetchCategoriesList } from "../../features/actions/categoryActions";
import { fetchEventList } from "../../features/actions/eventAction";
import { MdClear, MdDelete } from "react-icons/md";
import { addNewShop } from "../../features/actions/shopActions";
import { toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import nextIcon from "../../assets/svg/NextIcon.svg";
import previousIcon from "../../assets/svg/PreviousIcon.svg";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import LoadingButton from "../events/LoadingButton";
// ----------------------------------------------------------------------------------------------
const CreateShop = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    getValues,
    watch,
    resetField,
    getFieldState,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      keyPersonsDetails: [{ name: "", designation: "", mobileNo: "" }],
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, errorMessage } = useSelector(
    (state) => state.shop
  );
  const { statesList } = useSelector((state) => state.global);
  const { categoriesList } = useSelector((state) => state.category);

  const shopLogoRef = useRef();

  const [modifiedStatesList, setModifiedStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [shopLogo, setShopLogo] = useState("");
  const [modifiedCategoriesList, setModifiedCategoriesList] = useState([]);
  const [productCategoriesList, setProductCategoriesList] = useState([]);
  const [searchKeywordsList, setSearchKeywordsList] = useState([]);
  const [isShopApiCalled, setIsShopApiCalled] = useState(false);
  const [activeTab, setActiveTab] = useState("shopDetails");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyPersonsDetails",
  });

  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const [isSecondStepValid, setIsSecondStepValid] = useState(false);
  const { randomString, dynamicUrl: shopUrl } = generateDynamicUrl("shop");
  // -----------------------------------------------------------------------------------------------

  // This block is used to validate Multi Step Shop's Creation Form
  useEffect(() => {
    const stepFirstFormFields = [
      "shopName",
      "emailAddress",
      "registrationDate",
      "aboutUs",
      "bio",
      "shopAddress",
      "state",
      "city",
      "category",
      "productCategory",
    ];
    const stepSecondFormFields = ["primaryPhoneNumber"];

    // Checking 1st Step Form Validity
    const isFirstStepValidate = stepFirstFormFields.every((key) => {
      console.log(getFieldState(key));
      console.log(
        !getFieldState(key)?.invalid &&
          getFieldState(key)?.isDirty &&
          getFieldState(key)?.error === undefined &&
          searchKeywordsList.length > 0
      );

      return (
        !getFieldState(key)?.invalid &&
        getFieldState(key)?.isDirty &&
        getFieldState(key)?.error === undefined &&
        searchKeywordsList.length > 0
      );
    });

    isFirstStepValidate
      ? setIsFirstStepValid(true)
      : setIsFirstStepValid(false);

    // Checking 2nd Step Form Validity
    const isSecondStepValidate = stepSecondFormFields.every((key) => {
      return (
        !getFieldState(key)?.invalid &&
        getFieldState(key)?.isDirty &&
        getFieldState(key)?.error === undefined &&
        getValues("keyPersonsDetails")?.[0]?.name !== "" &&
        getValues("keyPersonsDetails")?.[0]?.mobileNo !== "" &&
        indianMobileRegex.test(getValues("keyPersonsDetails")?.[0]?.mobileNo) &&
        getValues("keyPersonsDetails")?.[0]?.mobileNo.length === 10 &&
        getValues("keyPersonsDetails")?.[0]?.designation !== ""
      );
    });

    isSecondStepValidate
      ? setIsSecondStepValid(true)
      : setIsSecondStepValid(false);
  }, [watch(), getFieldState(), searchKeywordsList, dirtyFields]);
  // -----------------------------------------------------------------------------------------------

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

  // This method is used to fetch and set Product Categories List based on categories selection.
  const fetchProductCategoriesList = (selectedCategories) => {
    const modifiedSelectedCategories = selectedCategories.map((el) => el.label);

    let res = [];
    categoriesList.forEach((mainCat) => {
      if (modifiedSelectedCategories.includes(mainCat.category))
        res = [...res, ...mainCat.productCategories];
    });
    setProductCategoriesList(
      res.map((el) => {
        return {
          label: el.productCategory,
          value: el._id,
        };
      })
    );
  };

  const manageSearchKeywords = (type, keyword = "", index = null) => {
    if (type === "add" && keyword?.length !== 0) {
      setSearchKeywordsList([...searchKeywordsList, keyword]);
      resetField("searchKeywords");
    } else if (type === "remove" && index !== null) {
      const existingSearchKeywords = [...searchKeywordsList];
      existingSearchKeywords.splice(index, 1);
      setSearchKeywordsList(existingSearchKeywords);
    } else if (type === "removeAll") {
      setSearchKeywordsList([]);
      resetField("searchKeywords");
    }
  };

  // This method is used to submit create shop form data.
  const onSubmit = (formData) => createNewShop(formData);

  // This method is used to add new shop in database.
  const createNewShop = (formData) => {
    const modifiedCategories = formData?.category?.map((cat) => cat?.value);
    const modifiedState = formData?.state?.value || "";
    const modifiedCity = formData?.city?.value || "";
    const modifiedProductCategories = formData?.productCategory?.map(
      (product) => product?.value
    );

    const modifiedShopLogo = formData?.shopLogo?.[0];
    const modifiedKeyPersonsDetails = formData.keyPersonsDetails;

    const shopDocuments = [
      formData?.shopDocumentFirst?.[0],
      formData?.shopDocumentSecond?.[0],
      formData?.shopDocumentThird?.[0],
    ];

    for (let key in formData) {
      if (
        key.includes("keyPersonsDetails") ||
        key.includes("shopDocument") ||
        key.includes("category") ||
        key.includes("state") ||
        key.includes("city") ||
        key.includes("productCategory")
      )
        delete formData[key];
    }

    // This object will be send to api
    const requestPayload = {
      ...formData,
      category: modifiedCategories,
      state: modifiedState,
      city: modifiedCity,
      productCategories: modifiedProductCategories,
      searchKeywords: searchKeywordsList,
      shopLogo: modifiedShopLogo,
      keyPersonsDetails: modifiedKeyPersonsDetails,
    };

    const formValues = new FormData();

    for (let key in requestPayload) {
      key !== "shopLogo" &&
        key !== "keyPersonsDetails" &&
        key !== "category" &&
        key !== "productCategories" &&
        key !== "searchKeywords" &&
        key !== "keyPersonsDetails" &&
        formValues.append(key, requestPayload[key]);
    }

    formValues.append("shopLogo", modifiedShopLogo);
    formValues.append("shopUrl", shopUrl);
    formValues.append("randomString", randomString);

    shopDocuments.forEach((pdf) => formValues.append("pdfList", pdf));
    formValues.append("category", JSON.stringify(requestPayload.category));
    formValues.append(
      "keyPersonsDetails",
      JSON.stringify(requestPayload.keyPersonsDetails)
    );
    formValues.append(
      "productCategories",
      JSON.stringify(requestPayload.productCategories)
    );
    formValues.append(
      "searchKeywords",
      JSON.stringify(requestPayload.searchKeywords)
    );

    dispatch(addNewShop(formValues));
    setIsShopApiCalled(true);
  };

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

  // This block of code is used to show image preview after uploading shop's logo.
  useEffect(() => {
    const imageData = watch("shopLogo")[0];
    const url = imageData ? window.URL.createObjectURL(imageData) : "";
    setShopLogo(url);
  }, [watch("shopLogo")]);

  // This block of code is used to set Categories List dropdown Values.
  useEffect(() => {
    if (categoriesList?.length > 0) {
      const existingCategoriesList = [...categoriesList];
      const uniqueCategories = [...new Set(existingCategoriesList)];

      setModifiedCategoriesList(
        uniqueCategories.map((category) => {
          return {
            label: category?.category,
            value: category?._id,
          };
        })
      );
    }
  }, [categoriesList]);

  // Redirection to Shops Listing Page after Shop Creation
  useEffect(() => {
    if (isSuccess && !errorMessage && isShopApiCalled) navigate("/shops");
  }, [navigate, errorMessage, isSuccess, isShopApiCalled]);

  //Showing Error Message in toast
  useEffect(() => {
    errorMessage &&
      isShopApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isShopApiCalled]);

  // Calling Categories and Events List APIs
  useEffect(() => {
    dispatch(fetchCategoriesList());
    dispatch(fetchEventList());
  }, []);

  // -------------------------------------------------------------------------------------------------------------------------------------

  return (
    <section>
      <Container>
        <Row>
          <Col className="p-0">
            <h2
              className={`text-center text-danger mb-3 py-2 ${styles.addShopTitle}`}
            >
              Add New Shop
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
              eventKey="shopDetails"
              title="Shop's Basic Details"
              className="bg-white"
            >
              <Row className="border border-secondary px-2 py-2 border-bottom-0">
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="shopName">
                    <Form.Label>Shop Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Shop Name"
                      {...register("shopName", {
                        required: {
                          value: true,
                          message: "Shop Name is required",
                        },
                        pattern: {
                          value: customFieldregex,
                          message: "Shop Name is invalid",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Shop Name cannot be less than 5 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "Shop Name cannot be more than 50 characters.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.shopName?.message}
                    </span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="state">
                    <Form.Label>Select State</Form.Label>
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
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.state?.message}
                    </span>
                  </Form.Group>
                  {shopLogo && (
                    <Form.Group className="mb-3" controlId="city">
                      <Form.Label>Select City</Form.Label>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                          <Select
                            options={citiesList}
                            onChange={(val) => {
                              onChange(val);
                            }}
                          />
                        )}
                        rules={{
                          required: {
                            message: "City is required",
                            value: true,
                          },
                        }}
                      />
                      <span className="fw-normal fs-6 text-danger">
                        {errors?.city?.message}
                      </span>
                    </Form.Group>
                  )}
                </Col>
                <Col sm={12} md={6}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="" controlId="shopLogo">
                        <Form.Label>Shop Logo</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          placeholder="Upload Shop's Logo"
                          {...register("shopLogo", {
                            required: {
                              value: true,
                              message: "Please upload shop logo",
                            },
                            validate: {
                              lessThan2MB: (files) =>
                                files[0]?.size < 2000000 ||
                                "Only 2 MB size is allowed",
                              acceptedFormats: (files) =>
                                !["image/png, image/jpg, image/jpeg"].includes(
                                  files[0]?.type
                                ) || "Only image is allowed",
                            },
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      {shopLogo && (
                        <img
                          className="my-2"
                          style={{ cursor: "pointer" }}
                          src={shopLogo || ""}
                          alt="shop logo"
                          width="200"
                          height="200"
                          ref={shopLogoRef}
                          onMouseOver={() => {
                            shopLogoRef.current.style.width = "400px";
                            shopLogoRef.current.style.height = "400px";
                          }}
                          onMouseOut={() => {
                            shopLogoRef.current.style.width = "200px";
                            shopLogoRef.current.style.height = "200px";
                          }}
                        />
                      )}

                      <div>
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.shopLogo?.message}
                        </span>
                      </div>

                      {!shopLogo && (
                        <Form.Group className="mt-3" controlId="city">
                          <Form.Label>Select City</Form.Label>
                          <Controller
                            name="city"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                options={citiesList}
                                onChange={(val) => {
                                  onChange(val);
                                }}
                              />
                            )}
                            rules={{
                              required: {
                                message: "City is required",
                                value: true,
                              },
                            }}
                          />
                          <span className="fw-normal fs-6 text-danger">
                            {errors?.city?.message}
                          </span>
                        </Form.Group>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={12}>
                  <Form.Group className="mb-3" controlId="shopAddress">
                    <Form.Label>Shop's Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter Shop Address"
                      {...register("shopAddress", {
                        required: {
                          value: true,
                          message: "Shop Address is required",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Shop Address cannot be less than 5 characters.",
                        },
                        maxLength: {
                          value: 500,
                          message:
                            "Shop Address cannot be more than 500 characters.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.shopAddress?.message}
                    </span>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="emailAddress">
                    <Form.Label>Shop Owner's Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Shop Owner's Email Address"
                      {...register("emailAddress", {
                        required: {
                          value: true,
                          message: "Email Address is required",
                        },
                        pattern: {
                          value: emailRegex,
                          message: "Shop Email Address is invalid",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.emailAddress?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="linkedIn">
                    <Form.Label>Linked In</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter LinkedIn URL"
                      {...register("linkedInUrl", {
                        required: {
                          value: false,
                          message: "LinkedIn URL is required",
                        },
                        pattern: {
                          value: websiteRegex,
                          message: "LinkedIn URL is invalid",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.linkedInUrl?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="instagram">
                    <Form.Label>Instagram</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Instagram URL"
                      {...register("instagramUrl", {
                        required: {
                          value: false,
                          message: "Instagram URL is required",
                        },
                        pattern: {
                          value: websiteRegex,
                          message: "Instagram URL is invalid",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.instagramUrl?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="aboutUs">
                    <Form.Label>About Us</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter Shop About Us"
                      {...register("aboutUs", {
                        required: {
                          value: true,
                          message: "Shop About Us is required",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Shop About Us cannot be less than 5 characters.",
                        },
                        maxLength: {
                          value: 1000,
                          message:
                            "Shop About Us cannot be more than 1000 characters.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.aboutUs?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="importExport">
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="importExport"
                        style={{ width: "18px", height: "18px" }}
                        {...register("importExport", {
                          required: {
                            value: false,
                            message:
                              "Import Export availability selection is required",
                          },
                        })}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="importExport"
                      >
                        Is Import/Export Available?
                      </label>
                    </div>
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.importExport?.message}
                    </span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="categories">
                    <Form.Label>Select Categories</Form.Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          options={modifiedCategoriesList}
                          onChange={(val) => {
                            onChange(val);
                            fetchProductCategoriesList(val);
                          }}
                          isMulti
                        />
                      )}
                      rules={{
                        required: {
                          message: "Category Selection is required",
                          value: true,
                        },
                      }}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.category?.message}
                    </span>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Website URL"
                      {...register("websiteUrl", {
                        required: {
                          value: false,
                          message: "Website URL is required",
                        },
                        pattern: {
                          value: websiteRegex,
                          message: "Website URL is invalid",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.websiteUrl?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="facebook">
                    <Form.Label>Facebook</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Facebook URL"
                      {...register("facebookUrl", {
                        required: {
                          value: false,
                          message: "Facebook URL is required",
                        },
                        pattern: {
                          value: websiteRegex,
                          message: "Facebook URL is invalid",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.facebookUrl?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registrationDate">
                    <Form.Label>Date of Registration</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Registration date"
                      max={moment().format("YYYY-MM-DD")}
                      {...register("registrationDate", {
                        required: {
                          value: true,
                          message: "Registration Date is required",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.registrationDate?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter Shop Bio"
                      {...register("bio", {
                        required: {
                          value: true,
                          message: "Shop Bio is required",
                        },
                        minLength: {
                          value: 5,
                          message: "Shop Bio cannot be less than 5 characters.",
                        },
                        maxLength: {
                          value: 1000,
                          message:
                            "Shop Bio cannot be more than 100 characters.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.bio?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="customization">
                    <div className="form-check">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        id="customization"
                        style={{ width: "18px", height: "18px" }}
                        {...register("customization", {
                          required: {
                            value: false,
                            message:
                              "Customization Available selection is required",
                          },
                        })}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customization"
                      >
                        Is Customization Available?
                      </label>
                    </div>
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.customization?.message}
                    </span>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="productCategory">
                    <Form.Label>Select Product Categories</Form.Label>
                    <Controller
                      name="productCategory"
                      control={control}
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          options={productCategoriesList}
                          onChange={(val) => {
                            onChange(val);
                          }}
                          isMulti
                        />
                      )}
                      rules={{
                        required: {
                          message: "Product Category Selection is required",
                          value: true,
                        },
                      }}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.productCategory?.message}
                    </span>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Row>
                    <Form.Label>Add Search keywords</Form.Label>

                    <Col sm={6} md={6}>
                      <Form.Group className="mb-3" controlId="searchKeywords">
                        <Form.Control
                          type="text"
                          placeholder="Enter Search Keyword"
                          {...register("searchKeywords", {
                            required: {
                              value:
                                searchKeywordsList.length === 0 ? true : false,
                              message: "Search Keyword is required",
                            },
                            minLength: {
                              value: 2,
                              message:
                                "Search Keyword cannot be less than 2 characters.",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Search Keyword cannot be more than 50 characters.",
                            },
                          })}
                        />

                        <span className="fw-normal fs-6 text-danger">
                          {errors?.searchKeywords?.message}
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={6}>
                      <Button
                        type="button"
                        size={"sm"}
                        variant="info"
                        disabled={
                          (getValues("searchKeywords") &&
                            getValues("searchKeywords").length < 2) ||
                          (getValues("searchKeywords") &&
                            getValues("searchKeywords").length > 50)
                        }
                        onClick={(e) => {
                          manageSearchKeywords(
                            "add",
                            getValues("searchKeywords")
                          );
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        size={"sm"}
                        variant="danger"
                        disabled={searchKeywordsList?.length === 0}
                        onClick={() => {
                          manageSearchKeywords("removeAll");
                        }}
                        className="mx-2"
                      >
                        Remove All
                      </Button>
                    </Col>
                  </Row>

                  <section className="mt-3">
                    <div className="text-primary d-flex justify-content-start flex-wrap gap-2">
                      {searchKeywordsList?.length > 0 &&
                        searchKeywordsList.map((keyword, i) => {
                          return (
                            <p
                              key={i}
                              className="border p-1 text-primary"
                              style={{ position: "relative" }}
                            >
                              {keyword}
                              <MdClear
                                style={{
                                  position: "absolute",
                                  right: "-5px",
                                  top: "-8px",
                                  cursor: "pointer",
                                  color: "red",
                                }}
                                onClick={() =>
                                  manageSearchKeywords("remove", "", i)
                                }
                              />
                            </p>
                          );
                        })}
                    </div>
                  </section>
                </Col>

                <Col sm={12} md={12}>
                  <Row>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="shopDocument1">
                        <Form.Label className="fw-bold">
                          Upload Shop Document [PDF ONLY WITH 2 MB SIZE]
                        </Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload Shop Document"
                          {...register("shopDocumentFirst", {
                            required: {
                              value: false,
                              message: "Please upload shop document",
                            },
                            validate: {
                              lessThan2MB: (files) =>
                                files[0]?.size < 2000000 ||
                                "Only 2 MB size is allowed",
                              acceptedFormats: (files) =>
                                ["application/pdf"].includes(files[0]?.type) ||
                                "Only PDF is allowed",
                            },
                          })}
                          accept="application/pdf"
                        />
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.shopDocumentFirst &&
                            errors?.shopDocumentFirst?.message}
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="shopDocument2">
                        <Form.Label className="fw-bold">
                          Upload Shop Document [PDF ONLY WITH 2 MB SIZE]
                        </Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload Shop Document"
                          {...register("shopDocumentSecond", {
                            required: {
                              value: false,
                              message: "Please upload shop document",
                            },
                            validate: {
                              lessThan2MB: (files) =>
                                files[0]?.size < 2000000 ||
                                "Only 2 MB size is allowed",
                              acceptedFormats: (files) =>
                                ["application/pdf"].includes(files[0]?.type) ||
                                "Only PDF is allowed",
                            },
                          })}
                          accept="application/pdf"
                        />
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.shopDocumentSecond?.message}
                        </span>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={4}>
                      <Form.Group className="mb-3" controlId="shopDocument3">
                        <Form.Label className="fw-bold">
                          Upload Shop Document [PDF ONLY WITH 2 MB SIZE]
                        </Form.Label>
                        <Form.Control
                          type="file"
                          placeholder="Upload Shop Document"
                          {...register("shopDocumentThird", {
                            required: {
                              value: false,
                              message: "Please upload shop document",
                            },
                            validate: {
                              lessThan2MB: (files) =>
                                files[0]?.size < 2000000 ||
                                "Only 2 MB size is allowed",
                              acceptedFormats: (files) =>
                                ["application/pdf"].includes(files[0]?.type) ||
                                "Only PDF is allowed",
                            },
                          })}
                          accept="application/pdf"
                        />
                        <span className="fw-normal fs-6 text-danger">
                          {errors?.shopDocumentThird?.message}
                        </span>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={12} className="text-center mb-5">
                  <Button
                    variant="success"
                    onClick={() => setActiveTab("contactDetails")}
                    disabled={!isFirstStepValid}
                  >
                    Next &nbsp; <img src={nextIcon} alt="next-icon" />
                  </Button>
                </Col>

                {/* {
                  isFirstStepValid && <Col sm={12} md={12} className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab("contactDetails")}
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
                      disabled={!isFirstStepValid || !isSecondStepValid}
                    >
                      Submit &nbsp;
                      <BsFillSendFill />
                    </Button>
                  )}
                </Col>
                } */}
              </Row>
            </Tab>
            <Tab
              eventKey="contactDetails"
              title="Shop's Contact Details"
              className="bg-white"
              disabled={!isFirstStepValid}
            >
              <Row className="border border-top-0 border-secondary  py-2">
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="primaryphoneNo">
                    <Form.Label>Primary Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Primary Phone Number"
                      {...register("primaryPhoneNumber", {
                        required: {
                          value: true,
                          message: "Primary Phone Number is required",
                        },
                        pattern: {
                          value: indianMobileRegex,
                          message: "Primary Phone Number is invalid",
                        },
                        minLength: {
                          value: 10,
                          message:
                            "Primary Phone Number cannot be less than 10 digits.",
                        },
                        maxLength: {
                          value: 12,
                          message:
                            "Primary Phone Number cannot be more than 12 digits.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.primaryPhoneNumber?.message}
                    </span>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="secondaryphoneNo">
                    <Form.Label>Secondary Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Secondary Phone Number"
                      {...register("secondaryPhoneNumber", {
                        required: {
                          value: false,
                          message: "Secondary Phone Number is required",
                        },
                        pattern: {
                          value: indianMobileRegex,
                          message: "Secondary Phone Number is invalid",
                        },
                        minLength: {
                          value: 10,
                          message:
                            "Secondary Phone Number cannot be less than 10 digits.",
                        },
                        maxLength: {
                          value: 12,
                          message:
                            "Secondary Phone Number cannot be more than 12 digits.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.secondaryPhoneNumber?.message}
                    </span>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="otherphoneNo">
                    <Form.Label>Other Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Other Phone Number"
                      {...register("otherPhoneNumber", {
                        required: {
                          value: false,
                          message: "Other Phone Number is required",
                        },
                        pattern: {
                          value: indianMobileRegex,
                          message: "Other Phone Number is invalid",
                        },
                        minLength: {
                          value: 10,
                          message:
                            "Other Phone Number cannot be less than 10 digits.",
                        },
                        maxLength: {
                          value: 12,
                          message:
                            "Other Phone Number cannot be more than 12 digits.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.otherPhoneNumber?.message}
                    </span>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3" controlId="whatsappNo">
                    <Form.Label>Whatsapp Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Whatsapp Number"
                      {...register("whatsappNo", {
                        required: {
                          value: false,
                          message: "Whatsapp Number is required",
                        },
                        pattern: {
                          value: indianMobileRegex,
                          message: "Whatsapp Number is invalid",
                        },
                        minLength: {
                          value: 10,
                          message:
                            "Whatsapp Number cannot be less than 10 digits.",
                        },
                        maxLength: {
                          value: 12,
                          message:
                            "Whatsapp Number cannot be more than 12 digits.",
                        },
                      })}
                    />
                    <span className="fw-normal fs-6 text-danger">
                      {errors?.whatsappNo?.message}
                    </span>
                  </Form.Group>
                </Col>

                <Col className="text-center" sm={12} md={12}>
                  <label className={styles.keyPersonDetails}>
                    Key Person's Details
                  </label>
                  <button
                    className="btn btn-primary float-end"
                    type="button"
                    onClick={() =>
                      append({ name: "", designation: "", mobileNo: "" })
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
                    <>
                      <Col sm={12} md={4}>
                        <Form.Group className="mb-3" controlId="keyPersonName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Please Enter Name"
                            {...register(`keyPersonsDetails.${index}.name`, {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                              minLength: {
                                value: 2,
                                message:
                                  "Name cannot be less than 2 characters.",
                              },
                              maxLength: {
                                value: 30,
                                message:
                                  "Name cannot be more than 30 characters.",
                              },
                            })}
                          />
                          <span className="fw-normal fs-6 text-danger">
                            {errors?.keyPersonsDetails?.[index]?.name?.message}
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={4}>
                        <Form.Group
                          className="mb-3"
                          controlId="keyPersonDesignation"
                        >
                          <Form.Label>Designation</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Please Enter Designation"
                            {...register(
                              `keyPersonsDetails.${index}.designation`,
                              {
                                required: {
                                  value: true,
                                  message: "Designation is required",
                                },
                                minLength: {
                                  value: 1,
                                  message:
                                    "Designation cannot be less than 1 character.",
                                },
                                maxLength: {
                                  value: 30,
                                  message:
                                    "Designation cannot be more than 30 characters.",
                                },
                              }
                            )}
                          />
                          <span className="fw-normal fs-6 text-danger">
                            {
                              errors?.keyPersonsDetails?.[index]?.designation
                                ?.message
                            }
                          </span>
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={4}>
                        <Form.Group
                          className="mb-3"
                          controlId="keyPersonMobileNumber"
                        >
                          <Form.Label className=" d-flex justify-content-between align-items-center">
                            Mobile Number
                            {fields.length > 1 && (
                              <button
                                style={{
                                  background: "white",
                                  color: "#FF6666",
                                }}
                                className={`btn py-0 z-1`}
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <MdDelete className="btn-danger " />
                              </button>
                            )}
                          </Form.Label>

                          <Form.Control
                            type="number"
                            placeholder="Please Enter Mobile Number"
                            {...register(
                              `keyPersonsDetails.${index}.mobileNo`,
                              {
                                required: {
                                  value: true,
                                  message: "Mobile Number is required",
                                },
                                pattern: {
                                  value: indianMobileRegex,
                                  message: "Mobile Number is invalid",
                                },
                                minLength: {
                                  value: 10,
                                  message:
                                    "Mobile Number cannot be less than 10 digits.",
                                },
                                maxLength: {
                                  value: 12,
                                  message:
                                    "Mobile Number cannot be more than 12 digits.",
                                },
                              }
                            )}
                          />
                          <span className="fw-normal fs-6 text-danger">
                            {
                              errors?.keyPersonsDetails?.[index]?.mobileNo
                                ?.message
                            }
                          </span>
                        </Form.Group>
                      </Col>
                    </>
                  );
                })}

                <Col sm={12} md={12} className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab("shopDetails")}
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
                      disabled={!isFirstStepValid || !isSecondStepValid}
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
      </Container>
    </section>
  );
};

export default CreateShop;

// ------------------------------------------- THE END -------------------------------------------
