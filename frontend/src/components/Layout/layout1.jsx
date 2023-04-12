import React from "react";
import "./layout.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "../Views/productList";

const Layout1 = () => {
  return (
    <div className="layout">
      <ProductList />
    </div>
  );
};

export default Layout1;
