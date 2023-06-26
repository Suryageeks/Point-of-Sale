import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import LazyLoad from "react-lazy-load";
import titleCase from "../../util/titleCase";

const ItemList = ({ prod }) => {
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch({
      type: "ADD_CART",
      payload: { ...prod, quantity: 1 },
    });
  };

  return (
    <div>
      <Card
        style={{ width: "14em", marginLeft: "2em" }}
        className="design-card shadow-lg"
      >
        <LazyLoad>
          <Card.Img
            key={prod}
            variant="center"
            src={prod.image}
            alt={prod.name}
            width={222}
            height={160}
          />
        </LazyLoad>
        <Card.Body>
          <Card.Title
            key={uuidv4()}
            style={{ fontSize: "1.5em" }}
            className="text-center"
          >
            {titleCase(prod.name)}
          </Card.Title>
          <div className="item-button" style={{ marginLeft: "-0.5em" }}>
            <Button onClick={() => handleCart()}>Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemList;
