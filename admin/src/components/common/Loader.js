import Spinner from "react-bootstrap/Spinner";
// -----------------------------------------------------------------------

// Global Loader Component
const Loader = () => {
  return (
    <>
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Please wait...</p>
      </div>
    </>
  );
};

export default Loader;
// -----------------------------------------------------------------------
