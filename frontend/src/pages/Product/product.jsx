import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Layout4 from "../../components/Layout/layout4";
import "./Product.scss";
import ProductList from "../../components/Views/productList";
import Pro from "../../components/Views/pro";

const Product = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Layout4 />
      </div>
    </div>
  );
};

export default Product;
