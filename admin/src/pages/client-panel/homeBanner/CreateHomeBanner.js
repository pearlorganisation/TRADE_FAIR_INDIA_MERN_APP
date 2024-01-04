import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { customFieldregex } from "../../../utils/regexes";
import LoadingButton from "../../events/LoadingButton";
import { toast } from "react-toastify";
import { createBanner } from "../../../features/actions/clientHomeBanner";

// ----------------------------------------------------------------------------
const CreateBanner = () => {
  // let isLoading = false;
  const [clientBannerData, setClientBannerData] = useState();
  const {
    register,
    handleSubmit,
    control,
    reset,
    resetField,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let { isBannerCreationSuccess, isLoading } = useSelector(
    (state) => state?.clientBanner
  );

  const formData = new FormData();
  const handleBanner = (bannerData) => {
    formData.append("banner", bannerData?.banner);
    formData.append("bannerData", bannerData?.bannerData);
    formData.append("buttonLink", bannerData?.buttonLink);
    dispatch(createBanner(formData));
  };

  if (isBannerCreationSuccess) {
    navigate("/client/homeBanners");
  }
  return (
    <>
      <div style={{ paddingBottom: "5rem" }} className="container">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium py-2 text-center"
            style={{ background: "rgb(71 76 114)", color: "white" }}
          >
            Create sub banner
          </div>
          <form
            onSubmit={handleSubmit(handleBanner)}
            className="border border-1 rounded-1 p-2 mt-1"
          >
            <div className="row">
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="banner" className="form-label fw-medium">
                    Banner image
                  </label>
                  <Controller
                    control={control}
                    name={"banner"}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <input
                          {...field}
                          value={value?.fileName}
                          onChange={(subBanner) => {
                            onChange(subBanner.target.files[0]);
                          }}
                          type="file"
                          id="banner"
                          className="form-control"
                        />
                      );
                    }}
                  />

                  {errors.banner && (
                    <span className="test-danger">
                      {errors?.banner?.message}
                    </span>
                  )}
                </div>
              </div>
              <div col-md-5>
                <div form-row my-3>
                  <label htmlFor="bannerData" className=" form-label">
                    Banner Data
                  </label>
                  <input
                    {...register("bannerData", {
                      required: {
                        message: "Banner Data  is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="banner Data"
                  ></input>
                  {errors.bannerData && (
                    <span className="test-danger">
                      {errors?.bannerData?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="buttonLink" className="form-label fw-medium">
                    Button Link
                  </label>

                  <input
                    {...register("buttonLink", {
                      required: {
                        message: "Button link is required",
                        value: true,
                      },
                    })}
                    type="text"
                    className="form-control"
                    id="buttonLink"
                  ></input>
                  {errors.buttonLink && (
                    <span className="test-danger">
                      {errors?.buttonLink?.message}
                    </span>
                  )}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBanner;
