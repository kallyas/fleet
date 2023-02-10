import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="main-wrap">
        <Navbar />
        <section className="content-main">{children}</section>
      </div>
    </>
  );
};

export default Layout;
