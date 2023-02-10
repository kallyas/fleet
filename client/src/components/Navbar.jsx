import React from "react";
import LetteredAvatar from "react-lettered-avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

const Navbar = () => {
  const user = useSelector(selectUser)
  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
              value={""}
              onChange={() => {}}
              readOnly
            />
            <button className="btn btn-light bg" type="button">
              {" "}
              <i className="material-icons md-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          {" "}
          <i className="material-icons md-apps"></i>{" "}
        </button>
        <ul className="nav">
          <li className="nav-item">
            <a 
            title={user.username || user.email}
            href="#" className="requestfullscreen nav-link btn-icon">
              <LetteredAvatar
                size={48}
                name={user.username || user.email}
                color="#fff"
                background="#000"
              />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

// img-xs rounded-circle
