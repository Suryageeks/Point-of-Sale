import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Category from "../Cards/Category";
import ProductList from "../Views/productList";

const ProductListFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("Drinks");

  const onSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <Category onSelectCategory={onSelectCategory} />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
};

export default ProductListFilter;
