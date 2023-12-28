import React from "react";

const LoadingButton = () => {
  return (
    <button
      className="btn btn-primary w-25 py-2 fw-medium fs-6"
      type="button"
      disabled
    >
      <span
        className="spinner-border spinner-border-sm mx-1"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
};

export default LoadingButton;
