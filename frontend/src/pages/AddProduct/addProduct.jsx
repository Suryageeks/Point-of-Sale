import React from "react";
import "./AddProduct.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Layout5 from "../../components/Layout/layout5";

const addProduct = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Layout5 />
      </div>
    </div>
  );
};

export default addProduct;
