import React from "react";
import "./Bills.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Layout8 from "../../components/Layout/layout8";

const Bills = () => {
  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Layout8 />
        </div>
      </div>
    </div>
  );
};

export default Bills;
