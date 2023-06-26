import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./product.css";

import Category from "../Cards/Category";
import Itemlist from "../Items/itemList";

const ProductList = () => {
  const [itemData, setItem] = useState([]);
  const effectRun = useRef(false);
  const [selectCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let isMount = true;
    if (effectRun.current === false) {
      const allProduct = async () => {
        try {
          const { data } = await axios.get("/api/v1/getproduct", {
            crossdomain: true,
          });
          isMount && setItem(data.item);
          console.log(data.item);
        } catch (error) {
          console.log(error);
        }
      };
      allProduct();
    }
    return () => {
      isMount = false;
      effectRun.current = true;
    };
  }, []);

  const filteredItem = itemData.filter(
    (item) => item.category.toLowerCase() === selectCategory.toLowerCase()
  );

  useEffect(() => {
    console.log("Selected Category:", selectCategory);
    console.log("Filtered Items:", filteredItem);
  }, [selectCategory, filteredItem]);

  return (
    <>
      <div className="page-wrapper">
        <Container>
          <Category setSelectedCategory={setSelectedCategory} />
          <div
            className="vertical-scroll "
            style={{
              paddingBottom: "2rem",
              marginTop: "2rem",
              position: "relative",
            }}
          >
            <Row
              style={{
                paddingTop: "5rem",
              }}
            >
              {filteredItem.map((prod) => (
                <Col
                  style={{
                    marginTop: "1em",
                  }}
                  key={prod.id}
                  md={3}
                >
                  {/* <div key={i}>{prod.name}</div> */}
                  <Itemlist prod={prod} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductList;
