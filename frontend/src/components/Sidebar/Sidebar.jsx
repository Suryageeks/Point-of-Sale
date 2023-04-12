import React, { useState } from "react";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("/api/v1/logout", null, { withCredentials: true })
      .then(() => {
        Cookies.remove("token");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sidebar">
      <ul>
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <li>
            <img src="https://img.icons8.com/ios/45/FFFFFF/null/home.png" />
          </li>
        </Link>
        <Link
          to="/product"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <li>
            <img src="https://img.icons8.com/dotty/45/FFFFFF/box.png" />{" "}
          </li>
        </Link>
        <li>
          <img src="https://img.icons8.com/dotty/45/FFFFFF/web-analystics.png" />
        </li>
        <Link to="/bill" style={{ textDecoration: "none", cursor: "pointer" }}>
          <li>
            <img src="https://img.icons8.com/ios/45/FFFFFF/null/paid-bill.png" />
          </li>
        </Link>
        <li style={{ cursor: "pointer" }} onClick={handleLogout}>
          <img src="https://img.icons8.com/ios/45/FFFFFF/shutdown--v1.png" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
