import React from "react";
import Layout from "../../components/Layout/layout3";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Cart.scss";
const cart = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Layout />
      </div>
    </div>
  );
};

export default cart;
