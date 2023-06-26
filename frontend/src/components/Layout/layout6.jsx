import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./layout.scss";

const Layout6 = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [number, setNumber] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/register", { name, email, password, number })
      .then(() => {
        alert("Successfully registered");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100 "
      style={{ paddingBottom: "10rem", marginTop: "3rem" }}
    >
      <div className="row pt-5 position-relative ">
        <div
          style={{ paddingBottom: "5em" }}
          className="col-md-3 bg-white p-5 flex-fill rounded shadow-lg  "
        >
          <p className="h3 text-center">SIGNUP</p>
          <div
            className="insideform "
            style={{ width: "25rem", paddingTop: "5%" }}
          >
            <Form onSubmit={handleSubmit} style={{ width: "22rem" }}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  name="mobile"
                  maxLength="10"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>

              <p
                style={{ fontSize: "14px", textDecoration: "none !important" }}
              >
                Already Registered!{" "}
                <Link to="/login">
                  <span
                    style={{
                      color: "#77ADEE",
                      cursor: "pointer",
                      textDecoration: "none !important",
                    }}
                  >
                    Click Here
                  </span>
                </Link>
              </p>

              <div className="d-flex justify-content-center pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="h5"
                  style={{
                    width: "18rem",
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

export default Layout6;
