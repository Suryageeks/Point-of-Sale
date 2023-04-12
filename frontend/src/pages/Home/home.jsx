import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Layout1 from "../../components/Layout/layout1";
import "./Home.scss";

const home = () => {
  return (
    <div className="home">
      <Navbar />
      <Sidebar />
      <div className="homeContainer">
        <Layout1 />
      </div>
    </div>
  );
};

export default home;
