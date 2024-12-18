import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingButton from "../../events/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import {
  updateBanner,
  updateHomeBanner,
} from "../../../features/actions/clientHomeBanner";

export const UpdateHomeBanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const formData = new FormData();

  const { state } = location;
  const id = state?._id;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      banner: state?.banner,
      buttonLink: state?.buttonLink,
      bannerData: state?.bannerData,
    },
  });

  const { isLoading, isSuccess, errorMessage, isHomeBannerUpdated } =
    useSelector((state) => state?.clientBanner);

  const [bannerImg, setBannerImg] = useState(state?.banner);
  const [mobileBannerImg, setMobileBannerImg] = useState(state?.mobileBanner);

  const [bannerFile, setBannerFile] = useState();
  const [mobileBannerFile, setMobileBannerFile] = useState();

  function handleBanner(bannerData) {
    console.log(bannerData);
    formData.append("banner", bannerFile || bannerImg);
    formData.append("mobileBanner", mobileBannerFile || mobileBannerImg);
    formData.append("bannerData", bannerData?.bannerData);
    formData.append("buttonLink", bannerData?.buttonLink);
    id
      ? dispatch(updateHomeBanner({ id, payload: formData }))
      : toast.error("Banner id is required!!");
  }

  function handleBannerData(e) {
    const img = e.target.files[0];
    setBannerImg(URL.createObjectURL(img));
    setBannerFile(img);
  }
  function handleMobileBannerData(e) {
    const img = e.target.files[0];
    setMobileBannerImg(URL.createObjectURL(img));
    setMobileBannerFile(img);
  }
  useEffect(() => {
    if (isHomeBannerUpdated) {
      navigate("/client/homeBanners");
    }
  }, [isHomeBannerUpdated]);

  return (
    <>
      <div style={{ padding: "5rem" }} className="container">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium py-2 text-center"
            style={{ background: "rgb(71 76 114)", color: "white" }}
          >
            Update Home Banner
          </div>
          <form
            onSubmit={handleSubmit(handleBanner)}
            className="border border-1 rounded-1 p-2 mt-1"
          >
            <div className="row">
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="desktopImg" className="form-label fw-medium">
                    Banner image
                  </label>
                  <Controller
                    control={control}
                    name={"banner"}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <>
                          <label
                            className="btn btn-outline-info m-2"
                            htmlFor="desktopImg"
                          >
                            Edit
                          </label>
                          <div className="w-100 h-100">
                            <img
                              src={bannerImg}
                              alt="logo"
                              style={{ width: "200px", height: "200px" }}
                            />
                          </div>
                          <input
                            onChange={(event) => {
                              handleBannerData(event);
                            }}
                            type="file"
                            id="desktopImg"
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
                  <label htmlFor="mobileImg" className="form-label fw-medium">
                    Mobile Banner image
                  </label>
                  <Controller
                    control={control}
                    name={"mobileBanner"}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <>
                          <label
                            className="btn btn-outline-info m-2"
                            htmlFor="mobileImg"
                          >
                            Edit
                          </label>
                          <div className="w-100 h-100">
                            <img
                              src={mobileBannerImg}
                              alt="logo"
                              style={{ width: "200px", height: "200px" }}
                            />
                          </div>
                          <input
                            onChange={(event) => {
                              handleMobileBannerData(event);
                            }}
                            type="file"
                            id="mobileImg"
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
                    Update
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
