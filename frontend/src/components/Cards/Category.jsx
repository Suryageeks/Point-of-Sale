import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Category = ({ setSelectedCategory }) => {
  const categories = [
    {
      name: "DRINKS",
    },
    {
      name: "ICECREAM",
    },
    {
      name: "STARTERS",
    },
  ];

  const handleClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Container>
      <Row>
        <Col
          style={{
            marginTop: "8em",
            display: "flex",
            marginLeft: "12em",
            justifyContent: "space-between",
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.name}
              style={{
                width: "15rem",
                backgroundColor: "#D89696",
                cursor: "pointer",
              }}
              onClick={() => handleClick(category.name)}
            >
              <Card.Body style={{ color: "#000000" }}>
                <Card.Title className="text-center fs-4">
                  {category.name}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
