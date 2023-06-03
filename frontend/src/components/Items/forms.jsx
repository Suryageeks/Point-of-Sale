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
    //const abortController = new AbortController();

    if (effectRun.current === false) {
      allProduct();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);

  useEffect(() => {
    //const abortController = new AbortController();
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
    <div className="outsideform">
      <div style={{ paddingBottom: "1em" }}>
        <b>ADD PRODUCT</b>
      </div>
      <div className="insideform">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Product Name"
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" name="price" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" placeholder="Category" name="category">
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
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Image URL" name="image" />
          </Form.Group>

          <span style={{}}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </span>
        </Form>
      </div>
    </div>
  );
};

export default Forms;
