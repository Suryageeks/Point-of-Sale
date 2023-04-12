import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/home";
import Product from "./pages/Product/product.jsx";
import Cart from "./pages/Cart/cart.jsx";
import AddProduct from "./pages/AddProduct/addProduct";
import Register from "./pages/Registration/register";
import Login from "./pages/Login/login";
import ProtectedRoutes from "./util/ProtectedRoutes";
import Bills from "./pages/Bills/bills";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/add" element={<AddProduct />} />
        <Route exact path="/bill" element={<Bills />} />
      </Routes>
    </>
  );
};

export default App;
