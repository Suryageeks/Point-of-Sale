import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      effectRun.current = true;
    };
  }, []);

  return (
    <>
      <Container>
        <Category setSelectedCategory={setSelectedCategory} />

        <Row style={{ paddingTop: "8em" }}>
          {itemData
            .filter((item) => item.category === selectCategory)
            .map((prod, i) => (
              <Col
                style={{
                  marginRight: "5em",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={prod.id}
              >
                {/* <div key={uuidv4()}>{prod.name}</div> */}
                <Itemlist prod={prod} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
