import {} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

function RequireAuth() {
  const location = useLocation();
  const user = useSelector(selectUser);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/", state: { from: location } }} />
  );
}


export default RequireAuth