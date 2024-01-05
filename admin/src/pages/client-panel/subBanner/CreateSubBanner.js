import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../events/LoadingButton";
import { createSubBanner } from "../../../features/actions/clientSubBanner";

const CreateSubBanner = () => {
  const [clientSubBannerData, setClientSubBannerData] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSubBannerCreationSuccess, isLoading } = useSelector(
    (state) => state?.clientSubBanner
  );

  const handleSubBanner = (subBannerData) => {
    const formData = new FormData();
    formData.append("banner", subBannerData?.banner[0]);
    formData.append("bannerData", subBannerData?.bannerData);
    formData.append("buttonLink", subBannerData?.buttonLink);
    dispatch(createSubBanner(formData));
  };

  useEffect(() => {
    if (isSubBannerCreationSuccess) {
      navigate("/client/subBanners");
    }
  }, [isSubBannerCreationSuccess, navigate]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12 fs-4 fw-medium py-2 text-center ">
        <h1 className="text-center text-danger"> Create Sub banner</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleSubBanner)}
          className="border border-1 rounded p-4 mt-3"
        >
          <div className="row">
            <div className="col-md-6 mb-3">
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
                <span className="text-danger">{errors.banner?.message}</span>
              )}
            </div>
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
            <div className="col-12 d-flex justify-content-end">
              {isLoading ? (
                <LoadingButton />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary py-2 fw-medium"
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

export default CreateSubBanner;
