import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        className="design-card"
      >
        <Card.Img
          key={prod}
          variant="center"
          src={prod.image}
          alt={prod.name}
          width={222}
          height={120}
        />
        <Card.Body>
          <Card.Title key={uuidv4()}>{prod.name}</Card.Title>
          <div className="item-button">
            <Button onClick={() => handleCart()}>Add to Cart</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemList;
