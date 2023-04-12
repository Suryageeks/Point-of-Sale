import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Layout8.scss";

const Layout8 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/getBill").then((data) => {
      setData(data.data.invoice);
      console.log(data.data.invoice);
    });
  }, []);

  return (
    <>
      <div>
        <h2
          style={{
            marginLeft: "50%",
            marginTop: "3rem",
            marginBottom: "-1.8rem",
          }}
        >
          INVOICE
        </h2>
        <div className="outerTable">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Mobile Number</th>
                <th>Grand Total</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length !== 0 ? (
                data.map((prod, i) => (
                  <tr key={i}>
                    <td>{prod.customerName}</td>
                    <td>{prod.customerNumber}</td>
                    <td>{prod.totalAmt}</td>
                    <td>{prod.paymentMethod}</td>
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABDUlEQVR4nO2WTYrCQBCF261zkMG1eoC5jOQtXHkAIYhVMqdxo3gUNaZaMGQxh8hQGXvQgKYhCS7sBwVJulLv658KMSYoqIE4kh3Dbs2rRJAfjQBgwha8ShQOIUIbypt9iFZR+qnxCEDHGDLoDIBh9wS5rCBfVQB9pmMEOXQGQJD4alpCOIAbc72POwMwpugxzuwgHIC71jHNaWTBkMHzfbyD+I868+r5eSiCpARJnmfdQ/jMnCFHjRZbq+gR0qmGz7J716WOetu7LkPOmjifZP22zL9n+ccVIKtNJsjatVMbEKV5ZBd/Ne2m9oUlTmOKbF495Y2jrJkMvagXk2Skv9u6ZC2YZzpzb/Ogt9MvY9R66qobN28AAAAASUVORK5CYII=" />
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
      </div>
    </>
  );
};

export default Layout8;
