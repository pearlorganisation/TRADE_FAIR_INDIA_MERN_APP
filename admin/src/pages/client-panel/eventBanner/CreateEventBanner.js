import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../events/LoadingButton";
import { createEventBanner } from "../../../features/actions/eventBannerAction";

const CreateEventBanner = () => {
  const [clientBannerData, setClientBannerData] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isBannerCreationSuccess, isLoading } = useSelector(
    (state) => state?.eventBanner
  );

  const handleBanner = (bannerData) => {
    const formData = new FormData();
    formData.append("banner", bannerData?.banner[0]);
    formData.append("bannerData", bannerData?.bannerData);
    formData.append("buttonLink", bannerData?.buttonLink);
    dispatch(createEventBanner(formData));
  };

  useEffect(() => {
    if (isBannerCreationSuccess) {
      navigate("/client/eventBanners");
    }
  }, [isBannerCreationSuccess, navigate]);

  return (
    <div className="container" style={{ paddingBottom: "5rem" }}>
      <div className="row">
        <div className="col-md-12 fs-4 fw-medium py-2 text-center ">
        <h1 className="text-center text-danger"> Create Event banner</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleBanner)}
          className="border border-1 rounded-1 p-2 mt-1"
        >
          <div className="row">
            <div className="col-md-6">
              <div className="form-row my-3">
                <label htmlFor="banner" className="form-label fw-medium">
                  Banner image
                </label>
                <Controller
                  control={control}
                  name="banner"
                  render={({ field: { onChange } }) => (
                    <input
                      onChange={(e) => onChange(e.target.files)}
                      type="file"
                      id="banner"
                      className="form-control"
                    />
                  )}
                />

                {errors.banner && (
                  <span className="text-danger">{errors?.banner?.message}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-row my-3">
                <label htmlFor="bannerData" className="form-label fw-medium">
                  Banner Data
                </label>
                <input
                  {...register("bannerData", {
                    required: "Banner Data is required",
                  })}
                  type="text"
                  className="form-control"
                  id="bannerData"
                />
                {errors.bannerData && (
                  <span className="text-danger">{errors.bannerData.message}</span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-row my-3">
                <label htmlFor="buttonLink" className="form-label fw-medium">
                  Button Link
                </label>

                <input
                  {...register("buttonLink", {
                    required: "Button link is required",
                  })}
                  type="text"
                  className="form-control"
                  id="buttonLink"
                />
                {errors.buttonLink && (
                  <span className="text-danger">{errors.buttonLink.message}</span>
                )}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end align-items-end">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-25 py-2 fw-medium"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventBanner;
