import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createHomeBanner } from "../../../features/actions/clientHomeBanner";
import LoadingButton from "../../events/LoadingButton";

const CreateBanner = () => {
  const [formData, setFormData] = useState(new FormData());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isBannerCreationSuccess, isLoading } = useSelector(
    (state) => state?.clientBanner
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleBanner = (bannerData) => {
    console.log(bannerData, "bannerData");
    formData.append("banner", bannerData?.banner[0]);
    formData.append("mobileBanner", bannerData?.mobileBanner[0]);

    formData.append("bannerData", bannerData?.bannerData);
    formData.append("buttonLink", bannerData?.buttonLink);
    dispatch(createHomeBanner(formData));
  };

  if (isBannerCreationSuccess) {
    navigate("/client/homeBanners");
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12 fs-4 fw-medium py-2 text-center">
          <h1 className="text-center text-danger"> Create Home banner</h1>
        </div>

        <form
          onSubmit={handleSubmit(handleBanner)}
          className="border rounded p-4 mt-3"
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="banner" className="form-label">
                Banner Image(Desktop)
              </label>
              <Controller
                control={control}
                name="banner"
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                    className="form-control"
                  />
                )}
              />
              {errors.banner && (
                <span className="text-danger">{errors.banner.message}</span>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="mobileBanner" className="form-label">
                Banner Image(Mobile)
              </label>
              <Controller
                control={control}
                name="mobileBanner"
                render={({ field: { onChange } }) => (
                  <input
                    type="file"
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                    className="form-control"
                  />
                )}
              />
              {errors.mobileBanner && (
                <span className="text-danger">
                  {errors.mobileBanner.message}
                </span>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="bannerData" className="form-label">
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

            <div className="col-md-6">
              <label htmlFor="buttonLink" className="form-label">
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

            <div className="col-12 d-flex justify-content-end">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <button type="submit" className="btn btn-primary">
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

export default CreateBanner;
