import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Layout8.scss";
import ReactPaginate from "react-paginate";
import titleCase from "../../util/titleCase";

const Layout8 = () => {
  const [data, setData] = useState([]);
  const [currentBills, setCurrentBills] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [billsOffset, setBillsOffset] = useState(0);

  useEffect(() => {
    axios.get("/api/v1/getBill").then((data) => {
      setData(data.data.invoice);
      console.log(data.data.invoice);
    });
  }, []);

  useEffect(() => {
    const endOffset = billsOffset + 7;
    setCurrentBills(data.slice(billsOffset, endOffset));
    setPageCount(Math.ceil(data.length / 7));
  }, [data, billsOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 7) % data.length;
    setBillsOffset(newOffset);
  };

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
              {currentBills && currentBills.length !== 0 ? (
                currentBills.map((prod, i) => (
                  <tr key={i}>
                    <td>{titleCase(prod.customerName)}</td>
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
                <tr>
                  <td colSpan={5}>
                    <h6>LOADING....</h6>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "7rem",
            marginTop: "-1.25rem",
            position: "sticky",
          }}
        >
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default Layout8;
