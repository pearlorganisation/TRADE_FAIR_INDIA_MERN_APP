import Login from "./Login";

function AuthLayout() {
  return (
    <div className="position-relative ">
      <nav
        style={{ background: "#383D67" }}
        className="nav  d-flex justify-content-between align-items-center  position-fixed top-0 w-100 text-white p-3"
      >
        <div className="fw-bolder fs-5">Trade Fair India</div>
        <div style={{ color: "#383D67" }}></div>
      </nav>

      <div className="h-100 d-flex justify-content-center align-items-center">
        <Login />
      </div>
    </div>
  );
}

export default AuthLayout;
