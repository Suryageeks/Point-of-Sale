import React, { useState, useEffect } from "react";
import "./layout.scss";
import "./layout3.scss";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AiFillDelete,
  AiFillPlusSquare,
  AiFillMinusSquare,
} from "react-icons/ai";

const Layout3 = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [custname, setCustname] = useState();
  const [custnumber, setCustnumber] = useState();
  const [tax, setTax] = useState();
  const [gross, setGross] = useState();
  const [total, setTotal] = useState();
  const [paymentmode, setPaymentmode] = useState();

  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    const product = cartItems.find((prod) => prod._id === id);
    dispatch({
      type: "UPDATE_CART",
      payload: { ...product, quantity: product.quantity + 1 },
    });
  };

  const handleDecrement = (id) => {
    const product = cartItems.find((prod) => prod._id === id);

    if (product.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...product, quantity: product.quantity - 1 },
      });
    }
  };

  const handleDelete = (id) => {
    const product = cartItems.find((prod) => prod._id === id);

    dispatch({
      type: "DELETE_CART",
      payload: product,
    });
  };

  useEffect(() => {
    let sum = 0;
    cartItems.forEach(
      (product) => (sum = sum + product.price * product.quantity)
    );
    setSubtotal(sum);
  }, [cartItems]);

  const tax_amt = ((subtotal * 18) / 100).toFixed(2);

  const grand_total = Number(subtotal) + Number(tax_amt);

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      customerName: custname,
      customerNumber: custnumber,
      paymentMethod: paymentmode,
      grossTotal: subtotal,
      tax: tax_amt,
      totalAmt: grand_total,
      cart: cartItems.map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity,
      })),
    };
    axios.post("/api/v1/addbill", invoiceData).then(() => {
      alert("Bill Generated");
      setCustname(" ");
      setCustnumber(" ");
      setGross(" ");
      setTax(" ");
      setTotal(" ");
    });
  };

  return (
    <div className="layout" style={{ marginTop: "-6rem" }}>
      <div
        style={{
          paddingTop: "9rem",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
      >
        <div
          style={{
            marginLeft: "48%",
            marginBottom: "-1.5rem",
          }}
        >
          <h2>CART</h2>
        </div>
        <div className="outerTable2">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Product Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length !== 0 ? (
                cartItems.map((prod, i) => (
                  <tr key={i}>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>
                      <div>
                        <AiFillPlusSquare
                          style={{ cursor: "pointer" }}
                          onClick={() => handleIncrement(prod._id)}
                        />
                        <b>{prod.quantity}</b>
                        <AiFillMinusSquare
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDecrement(prod._id)}
                        />
                      </div>
                    </td>
                    <td>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        width="60"
                        height="60"
                      />
                    </td>
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <AiFillDelete
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(prod._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <p>
                  <h6>LOADING....</h6>
                </p>
              )}
            </tbody>
          </table>
        </div>
        <Button className="subtotal" onClick={handleShow}>
          Invoice
        </Button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Generate Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalTable">
              <table>
                <tr>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
                {cartItems.map((prod) => (
                  <tr key={prod.id} style={{ marginRight: "1em" }}>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>{prod.quantity}</td>
                  </tr>
                ))}
              </table>
            </div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Customer Name"
                  name="customerName"
                  onChange={(e) => setCustname(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Customer Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  name="customerNumber"
                  onChange={(e) => setCustnumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Payment Mode"
                  name="paymentMethod"
                  onChange={(e) => setPaymentmode(e.target.value)}
                >
                  <option name="Cash" value="Cash">
                    Cash
                  </option>
                  <option name="Card" value="Card">
                    Card
                  </option>
                  <option name="Online Wallet" value="Online Wallet">
                    Online Wallet
                  </option>
                </Form.Control>
              </Form.Group>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p onChange={(e) => setGross(e.target.value)}>
                  <h6>Subtotal</h6>
                  {subtotal.toFixed(2)}
                </p>
                <p onChange={(e) => setTax(e.target.value)}>
                  <h6>Tax</h6>
                  {tax_amt}
                </p>
                <p onChange={(e) => setTotal(e.target.value)}>
                  <h6>Total</h6>
                  {grand_total}
                </p>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Generate
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Layout3;
