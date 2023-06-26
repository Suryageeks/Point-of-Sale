import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "./forms.scss";

import axios from "axios";

const Forms = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const effectRun = useRef(false);

  let isMount = true;
  const allProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/getproduct", {
        crossdomain: true,
      });
      isMount && setData(data.item);
      console.log(data.item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (effectRun.current === false) {
      allProduct();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);

  useEffect(() => {
    let isMount = true;
    if (effectRun.current === false) {
      const getCategory = async () => {
        try {
          const { data } = await axios.get("/api/v1/getcategory", {
            crossdomain: true,
          });
          isMount && setCategories(data.categoryEnum);
          console.log(data.categoryEnum);
        } catch (error) {
          console.log(error);
        }
      };
      getCategory();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
      allProduct();
      await axios.post("/api/v1/addProduct", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{ paddingBottom: "10rem" }}
    >
      <div className="row pt-5 position-relative ">
        <div
          style={{ paddingBottom: "5em" }}
          className="col-md-3 bg-white p-5 flex-fill rounded shadow-lg "
        >
          <p className="h3 text-center">ADD PRODUCT</p>
          <div
            className="insideform"
            style={{ width: "25rem", paddingTop: "5%" }}
          >
            <Form onSubmit={handleSubmit} style={{ width: "25rem" }}>
              <Form.Group className="mb-3">
                <Form.Label className="h5">Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Product Name"
                  name="name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="h5">Price</Form.Label>
                <Form.Control type="number" placeholder="Price" name="price" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="h5">Category</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Category"
                  name="category"
                >
                  <option name="Icecream" value="Icecream">
                    Icecream
                  </option>
                  <option name="Drinks" value="Drinks">
                    Drinks
                  </option>
                  <option name="Starters" value="Starters">
                    Starters
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="h5">Image Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image URL"
                  name="image"
                />
              </Form.Group>

              <div className="d-flex justify-content-center pt-1">
                <Button
                  variant="primary"
                  type="submit"
                  className="h5"
                  style={{
                    width: "20rem",
                    height: "2.7rem",
                    backgroundColor: "#A084DC",
                    border: 0,
                  }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
