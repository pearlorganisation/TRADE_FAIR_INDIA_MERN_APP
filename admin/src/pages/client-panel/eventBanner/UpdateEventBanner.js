import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoadingButton from "../../events/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { updateEventBanner } from "../../../features/actions/eventBannerAction";

export const UpdateEventBanner = () => {
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
    getValues,
    setValue,
    watch,
    reset,
    resetField,
    getFieldState,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      banner: state?.banner,
      buttonLink: state?.buttonLink,
      bannerData: state?.bannerData,
    },
  });

  const { isLoading, isSuccess, errorMessage, isBannerUpdated } = useSelector(
    (state) => state?.eventBanner
  );
  const [isBannerUpdationApiCalled, setIsBannerUpdationApiCalled] =
    useState(false);
  const [modifiedBanner, setModifiedBannerList] = useState([]);
  const [bannerImg, setBannerImg] = useState(state?.banner);

  const [bannerFile, setBannerFile] = useState();

  useEffect(() => {
    errorMessage &&
      isBannerUpdationApiCalled &&
      toast.error(errorMessage, {
        position: "bottom-center",
      });
  }, [errorMessage, isBannerUpdationApiCalled]);

  function handleBanner(bannerData) {
    formData.append("banner", bannerFile || bannerImg);
    formData.append("bannerData", bannerData?.bannerData);
    id
      ? dispatch(updateEventBanner({ id, payload: formData }))
      : toast.error("Banner id is required!!");
  }

  function handleBannerData(e) {
    const bannerImg = e.target.files[0];
    setBannerImg(URL.createObjectURL(bannerImg));
    setBannerFile(bannerImg);
  }

  if (isBannerUpdated && !errorMessage) {
    navigate("/client/eventBanners");
  }

  return (
    <>
      <div style={{ padding: "5rem" }} className="container">
        <div className="row">
          <div
            className="col-md-12 fs-4 fw-medium py-2 text-center my-2"
            style={{ background: "rgb(71 76 114)", color: "white" }}
          >
            Update Event Banner
          </div>
          <form
            onSubmit={handleSubmit(handleBanner)}
            className="border border-1 rounded-1 p-2 mt-1"
          >
            <div className="row">
              <div className="col-md-5">
                <div className="form-row my-3">
                  <label htmlFor="logo" className="form-label fw-medium">
                    Event Banner image
                  </label>
                  <Controller
                    control={control}
                    name={"banner"}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <>
                          <label
                            className="btn btn-outline-info m-2"
                            htmlFor="banner"
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
                            id="banner"
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
                    Event Banner Data
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

              <div className="col-12 d-flex justify-content-end align-items-end p-3">
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
