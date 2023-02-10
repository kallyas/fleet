import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <div>Loging out...</div>;
};

export default Logout;
