import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "./categories.css";
import titleCase from "../../util/titleCase";

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
    {
      name: "Main Course",
    },
    {
      name: "Breakfast",
    },
    {
      name: "Tea",
    },
  ];

  const sliderRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Container>
      <Row>
        <div
          ref={sliderRef}
          style={{
            marginTop: "8em",
            display: "flex",
            overflowX: "auto",
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((category) => (
            <Card
              key={category.name}
              style={{
                flex: "0 0 15rem",
                margin: "0 0.5rem",
                cursor: "pointer",
              }}
              className="shadow-lg card-color"
              onClick={() => handleClick(category.name)}
            >
              <Card.Body style={{ color: "#000000" }}>
                <Card.Title className="text-center fs-4 card-slider card-text">
                  {titleCase(category.name)}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Row>
    </Container>
  );
};

export default Category;
