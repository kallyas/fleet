import {} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

function RequireNoAuth() {
  const location = useLocation();
  const user = useSelector(selectUser);

  return user ? (
    <Navigate to={{ pathname: "/dashboard", state: { from: location } }} />
  ) : (
    <Outlet />
  );
}

export default RequireNoAuth;
