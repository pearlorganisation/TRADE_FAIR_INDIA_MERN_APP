import React from "react";

const LoadingButton = () => {
  return (
    <button className="btn btn-primary py-2 fs-6" type="button" disabled>
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
