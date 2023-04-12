import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.rootReducer);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const navigate = useNavigate();

  return (
    <div className="nav ">
      <div className="insidebar">
        <div className="textbox cart-item">
          <p
            style={{
              color: "black",
              paddingLeft: "8rem",
            }}
          >
            {cartItems.length}
            <span style={{ paddingLeft: "1rem" }}>
              <BsFillCartFill
                style={{
                  fontSize: "2em",
                  color: "black",
                  borderColor: "black",
                }}
                onClick={() => navigate("/cart")}
              />
            </span>
          </p>
        </div>
      </div>
      <hr style={{ color: "black" }} />
    </div>
  );
};

export default Navbar;
