import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./display.scss";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import titleCase from "../../util/titleCase";

const DisplayProduct = () => {
  const [itemData, setItemData] = useState([]);
  const effectRun = useRef(false);
  const [filterData, setFilterData] = useState([]);
  const [currentBills, setCurrentBills] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [billsOffset, setBillsOffset] = useState(0);

  // const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete(`/api/v1/deleteproduct/${id}`)
      .then((res) => {
        console.log(res.data);
        setItemData(itemData.filter((item) => item._id !== id));
        setFilterData(filterData.filter((filterData) => filterData._id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //const abortController = new AbortController();
    let isMount = true;
    if (effectRun.current === false) {
      const allProduct = async () => {
        try {
          const { data } = await axios.get("/api/v1/getproduct", {
            crossdomain: true,
          });
          isMount && setItemData(data.item);
          console.log(data.item);
        } catch (error) {
          console.log(error);
        }
      };
      allProduct();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);

  useEffect(() => {
    const endOffset = billsOffset + 4;
    setCurrentBills(itemData.slice(billsOffset, endOffset));
    setPageCount(Math.ceil(itemData.length / 4));
  }, [itemData, billsOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % itemData.length;
    setBillsOffset(newOffset);
  };

  return (
    <div className="productlist">
      <div style={{ marginTop: "-3.5rem" }}>
        <h2 style={{ marginLeft: "45%", marginBottom: "-6px" }}>PRODUCTS</h2>
      </div>
      <div
        style={{
          paddingTop: "2em",
          paddingRight: "20rem",
        }}
      >
        <div className="outerTable1">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBills && currentBills.length !== 0 ? (
                currentBills.map((prod, i) => (
                  <tr key={i}>
                    <td>{titleCase(prod.name)}</td>
                    <td>{prod.price}</td>
                    <td>{titleCase(prod.category)}</td>
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
                        <img
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzklEQVR4nO2ZMQ7CMAxF39QdcQi4KeUmlbgFXIWUCwCrUaSwZIhom8gt+k/y6Mg/zpsCQojW7IABeAI2sV7ABdizAoYZAfKKZ7jzTsMcZ/QeUm88w53vrXr1/0wHnIGxwhOaWgHo0wyL6R0CWFZxhsV4bMKyetQI4h3CajnkHcAUJONvNnJbQYhrjSBirdhW3chRELQR9LRKyBHkCHKkhBxBjiBHSsgR5AhypIQcQY4gR0rIEeQIcqREcPDkTgM8vuBOLYJ0KUzY2ieoEAI+WdpzzLrnc/kAAAAASUVORK5CYII="
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(prod._id)}
                          width="35"
                          height="35"
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "15rem",
            marginTop: "-1.25rem",
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
        <span style={{ marginLeft: "84.4rem" }}>
          <Link to="/add">
            <Button
              style={{
                width: "10rem",
                height: "2.7rem",
                backgroundColor: "#A084DC",
                border: 0,
              }}
            >
              Add Product
            </Button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default DisplayProduct;
